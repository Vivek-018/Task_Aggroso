import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { testGeminiConnection } from '@/lib/gemini';
import { StatusResponse } from '@/types/spec';

export async function GET() {
  const status: StatusResponse = {
    backend: 'ok',
    database: 'disconnected',
    gemini: 'disconnected',
  };

  // Check database connection
  try {
    await connectDB();
    status.database = 'connected';
  } catch (error) {
    status.database = 'error';
    console.error('Database connection error:', error);
  }

  // Check Gemini connection
  try {
    const geminiOk = await testGeminiConnection();
    status.gemini = geminiOk ? 'connected' : 'error';
  } catch (error) {
    status.gemini = 'error';
    console.error('Gemini connection error:', error);
  }

  const allOk = status.backend === 'ok' && status.database === 'connected' && status.gemini === 'connected';

  return NextResponse.json(status, { status: allOk ? 200 : 503 });
}
