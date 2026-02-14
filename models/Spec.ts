import mongoose, { Schema, Document, Model } from 'mongoose';
import { SpecOutput } from '@/types/spec';

export interface ISpec extends Document {
  title: string;
  goal: string;
  users: string;
  constraints: string;
  templateType: 'Web App' | 'Mobile App' | 'Internal Tool';
  output: SpecOutput;
  createdAt: Date;
}

const SpecSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  goal: {
    type: String,
    required: true,
    trim: true,
  },
  users: {
    type: String,
    required: true,
    trim: true,
  },
  constraints: {
    type: String,
    required: true,
    trim: true,
  },
  templateType: {
    type: String,
    required: true,
    enum: ['Web App', 'Mobile App', 'Internal Tool'],
  },
  output: {
    type: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Keep only last 5 specs
SpecSchema.statics.keepLastFive = async function () {
  const count = await this.countDocuments();
  if (count > 5) {
    const oldestSpecs = await this.find()
      .sort({ createdAt: 1 })
      .limit(count - 5);
    const idsToDelete = oldestSpecs.map((spec: ISpec) => spec._id);
    await this.deleteMany({ _id: { $in: idsToDelete } });
  }
};

export const Spec: Model<ISpec> =
  mongoose.models.Spec || mongoose.model<ISpec>('Spec', SpecSchema);
