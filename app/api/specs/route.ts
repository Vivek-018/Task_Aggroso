import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { handleApiError } from '@/utils/errorHandler';
import { Spec } from '@/models/Spec';

export async function GET() {
  try {
    await connectDB();

    const specs = await Spec.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({ specs }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
