// Quick script to verify .env file format
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

console.log('Checking .env file...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file does NOT exist!');
  console.log('\nPlease create a .env file in the root directory with:');
  console.log('MONGODB_URI=your_mongodb_uri');
  console.log('GEMINI_API_KEY=your_gemini_api_key');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

console.log('✅ .env file exists\n');
console.log('Checking for required variables:\n');

const hasMongoDB = envContent.includes('MONGODB_URI');
const hasGemini = envContent.includes('GEMINI_API_KEY');

if (hasMongoDB) {
  const mongoLine = lines.find(line => line.startsWith('MONGODB_URI'));
  if (mongoLine && mongoLine.split('=')[1] && mongoLine.split('=')[1].trim()) {
    console.log('✅ MONGODB_URI is set');
  } else {
    console.log('❌ MONGODB_URI is empty or has no value');
  }
} else {
  console.log('❌ MONGODB_URI is missing');
}

if (hasGemini) {
  const geminiLine = lines.find(line => line.startsWith('GEMINI_API_KEY'));
  if (geminiLine && geminiLine.split('=')[1] && geminiLine.split('=')[1].trim()) {
    console.log('✅ GEMINI_API_KEY is set');
  } else {
    console.log('❌ GEMINI_API_KEY is empty or has no value');
  }
} else {
  console.log('❌ GEMINI_API_KEY is missing');
}

console.log('\n--- .env file content (values hidden) ---');
lines.forEach(line => {
  const [key, ...valueParts] = line.split('=');
  const value = valueParts.join('=');
  if (value && value.trim()) {
    console.log(`${key}=${value.substring(0, 10)}... (hidden)`);
  } else {
    console.log(`${key}= (empty)`);
  }
});
