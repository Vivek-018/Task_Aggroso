import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { handleApiError } from '@/utils/errorHandler';
import { Spec } from '@/models/Spec';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const spec = await Spec.findById(params.id).lean();

    if (!spec) {
      return NextResponse.json(
        { error: 'Not Found', message: 'Spec not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ spec }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const spec = await Spec.findByIdAndUpdate(
      params.id,
      { output: body.output },
      { new: true, runValidators: true }
    ).lean();

    if (!spec) {
      return NextResponse.json(
        { error: 'Not Found', message: 'Spec not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ spec }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
