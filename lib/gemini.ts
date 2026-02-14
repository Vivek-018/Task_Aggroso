import { GoogleGenerativeAI } from '@google/generative-ai';
import { FeatureFormData, SpecOutput } from '@/types/spec';

function getGeminiClient() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error('Please define the GEMINI_API_KEY environment variable inside .env');
  }

  return new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Cache for available model
let cachedModelName: string | null = null;

async function getAvailableModel(): Promise<string> {
  // Return cached model if available
  if (cachedModelName) {
    return cachedModelName;
  }

  const genAI = getGeminiClient();
  
  // Try to list available models
  try {
    // List models using the API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.models && data.models.length > 0) {
        // Find a model that supports generateContent
        const availableModel = data.models.find((m: any) => 
          m.supportedGenerationMethods?.includes('generateContent')
        );
        
        if (availableModel) {
          // Extract just the model name (remove 'models/' prefix if present)
          const modelName = availableModel.name.replace('models/', '');
          console.log(`Found available model: ${modelName}`);
          cachedModelName = modelName;
          return modelName;
        }
      }
    }
  } catch (error) {
    console.warn('Could not list models, will try common names:', error);
  }
  
  // Fallback: Try common model names in order
  const commonModels = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
    'models/gemini-1.5-flash',
    'models/gemini-1.5-pro',
    'models/gemini-pro',
  ];
  
  // Add user-specified model first if set
  if (process.env.GEMINI_MODEL) {
    commonModels.unshift(process.env.GEMINI_MODEL);
  }
  
  for (const modelName of commonModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      // Test with a very simple request (just 1 character to minimize API usage)
      const testResult = await model.generateContent('Hi');
      const testResponse = await testResult.response;
      const testText = testResponse.text();
      if (testText && testText.length > 0) {
        console.log(`Found working model: ${modelName}`);
        cachedModelName = modelName;
        return modelName;
      }
    } catch (error) {
      // Try next model
      console.log(`Model ${modelName} not available, trying next...`);
      continue;
    }
  }
  
  throw new Error(
    'No available Gemini models found. Please check your API key and ensure it has access to Gemini models.'
  );
}

export async function generateSpec(inputData: FeatureFormData): Promise<SpecOutput> {
  const genAI = getGeminiClient();
  
  // Get an available model
  const modelName = await getAvailableModel();
  console.log(`Using model: ${modelName}`);
  
  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are a product planning assistant. Generate a comprehensive product specification based on the following feature description.

Feature Title: ${inputData.title}
Goal: ${inputData.goal}
Target Users: ${inputData.users}
Constraints: ${inputData.constraints}
Template Type: ${inputData.templateType}

Generate a detailed specification and return ONLY valid JSON (no markdown, no code blocks, no explanations) with the following exact structure:

{
  "overview": "A comprehensive overview of the feature (2-3 paragraphs)",
  "user_stories": [
    {
      "title": "User story title",
      "description": "Detailed user story description"
    }
  ],
  "engineering_tasks": [
    {
      "group": "Frontend",
      "task": "Specific engineering task description"
    },
    {
      "group": "Backend",
      "task": "Specific engineering task description"
    },
    {
      "group": "DevOps",
      "task": "Specific engineering task description"
    },
    {
      "group": "Testing",
      "task": "Specific engineering task description"
    }
  ],
  "risks": ["Risk 1", "Risk 2"],
  "unknowns": ["Unknown 1", "Unknown 2"]
}

Requirements:
- Return ONLY valid JSON, no markdown formatting, no code blocks
- Include at least 3-5 user stories
- Include at least 8-12 engineering tasks distributed across Frontend, Backend, DevOps, and Testing groups
- Include at least 2-3 risks
- Include at least 2-3 unknowns
- All fields must be strings (no null values)
- Ensure JSON is valid and parseable`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse JSON
    const parsed: SpecOutput = JSON.parse(cleanedText);

    // Validate structure
    if (!parsed.overview || !Array.isArray(parsed.user_stories) || !Array.isArray(parsed.engineering_tasks)) {
      throw new Error('Invalid response structure from Gemini');
    }

    // Ensure all required fields exist
    if (!parsed.risks) parsed.risks = [];
    if (!parsed.unknowns) parsed.unknowns = [];

    // Validate engineering tasks have correct group values
    const validGroups = ['Frontend', 'Backend', 'DevOps', 'Testing'];
    parsed.engineering_tasks = parsed.engineering_tasks.map((task) => {
      if (!validGroups.includes(task.group)) {
        task.group = 'Frontend'; // Default fallback
      }
      return task;
    });

    return parsed;
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Clear cached model on error so we try again next time
    cachedModelName = null;
    
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('not found')) {
        throw new Error(
          `Model not found. Please check your API key has access to Gemini models. ` +
          `You can set GEMINI_MODEL in .env to specify a model name.`
        );
      }
      if (error.message.includes('429') || error.message.includes('quota')) {
        throw new Error('API rate limit exceeded. Please try again later or upgrade your API plan.');
      }
      if (error.message.includes('401') || error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env file.');
      }
    }
    
    throw new Error(`Failed to generate spec: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function testGeminiConnection(): Promise<boolean> {
  try {
    const modelName = await getAvailableModel();
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Reply with OK');
    const response = await result.response;
    const text = response.text();
    return text.toLowerCase().includes('ok');
  } catch (error) {
    console.error('Gemini connection test failed:', error);
    return false;
  }
}
