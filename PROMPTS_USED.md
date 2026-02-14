# Development Prompts Used

This document contains the prompts used during the development of this project. It does not include AI responses or API keys.

## Initial Project Setup Prompt

```
You are a senior full-stack engineer.

Build a complete production-ready web application according to the following requirements.

PROJECT NAME:
Tasks Generator – AI Product Planning Tool

TECH STACK (MANDATORY):
- Next.js (latest version, App Router)
- TypeScript
- MongoDB
- Mongoose ORM
- Gemini AI (Google Generative AI SDK)
- Tailwind CSS for styling
- Modular folder structure
- Environment variables (.env)

[Full requirements as specified in the user query]
```

## Production Gemini Prompt

The following prompt is used in production to generate specifications. It is located in `/lib/gemini.ts`:

```
You are a product planning assistant. Generate a comprehensive product specification based on the following feature description.

Feature Title: {title}
Goal: {goal}
Target Users: {users}
Constraints: {constraints}
Template Type: {templateType}

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
- Ensure JSON is valid and parseable
```

## Key Prompt Design Decisions

1. **Strict JSON Format**: The prompt explicitly instructs the AI to return ONLY JSON without markdown formatting to ensure reliable parsing.

2. **Structured Output**: The prompt provides a clear JSON schema to follow, reducing the need for post-processing.

3. **Minimum Requirements**: Specifies minimum counts for each section to ensure comprehensive output.

4. **Group Distribution**: Explicitly mentions all four engineering task groups to ensure balanced output.

5. **No Explanations**: Instructs the AI not to include explanations or code blocks, only the JSON data.

## Prompt Refinement Process

The production prompt was refined through:
- Testing with various feature descriptions
- Adjusting instructions for better JSON consistency
- Adding explicit requirements for minimum counts
- Emphasizing the "ONLY JSON" requirement to avoid markdown code blocks

## Development Prompts Used

During development, prompts were used for:
- Setting up Next.js 14 App Router project structure
- Creating TypeScript types and interfaces
- Implementing MongoDB with Mongoose
- Building React components with Tailwind CSS
- Creating API routes in Next.js
- Implementing Gemini AI integration
- Fixing environment variable loading issues
- Upgrading UI to dark theme
- Implementing responsive design
- Error handling and validation

## No API Keys

This document does not contain any API keys or sensitive credentials. All API keys are stored in environment variables as specified in `.env.example`.
