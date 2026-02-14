import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { generateSpec } from '@/lib/gemini';
import { validateFeatureForm } from '@/lib/validators';
import { handleApiError } from '@/utils/errorHandler';
import { Spec } from '@/models/Spec';
import { FeatureFormData } from '@/types/spec';

export async function POST(request: NextRequest) {
  try {
    const body: Partial<FeatureFormData> = await request.json();

    // Validate input
    const validation = validateFeatureForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation Error', message: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Generate spec using Gemini
    const output = await generateSpec(body as FeatureFormData);

    // Connect to database
    await connectDB();

    // Create and save spec
    const spec = new Spec({
      title: body.title,
      goal: body.goal,
      users: body.users,
      constraints: body.constraints,
      templateType: body.templateType,
      output,
      createdAt: new Date(),
    });

    await spec.save();

    // Keep only last 5 specs
    const count = await Spec.countDocuments();
    if (count > 5) {
      const oldestSpecs = await Spec.find().sort({ createdAt: 1 }).limit(count - 5);
      const idsToDelete = oldestSpecs.map((s) => s._id);
      if (idsToDelete.length > 0) {
        await Spec.deleteMany({ _id: { $in: idsToDelete } });
      }
    }

    // Convert to plain object for JSON response
    const specObj = spec.toObject();

    return NextResponse.json({ spec: specObj }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
