import { NextResponse } from 'next/server';

export interface ApiError {
  error: string;
  message: string;
  statusCode?: number;
}

export function createErrorResponse(
  message: string,
  statusCode: number = 500
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: 'Error',
      message,
      statusCode,
    },
    { status: statusCode }
  );
}

export function handleApiError(error: unknown): NextResponse<ApiError> {
  console.error('API Error:', error);

  if (error instanceof Error) {
    // Check for specific error types
    if (error.message.includes('MongoDB') || error.message.includes('database')) {
      return createErrorResponse('Database connection error', 503);
    }
    if (error.message.includes('Gemini') || error.message.includes('API')) {
      return createErrorResponse('AI service error: ' + error.message, 503);
    }
    if (error.message.includes('validation') || error.message.includes('required')) {
      return createErrorResponse(error.message, 400);
    }
    return createErrorResponse(error.message, 500);
  }

  return createErrorResponse('An unexpected error occurred', 500);
}
