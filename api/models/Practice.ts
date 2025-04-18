import mongoose, { Document, Schema } from 'mongoose';

export interface IPractice extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  drills: {
    name: string;
    repetitions: number;
    successRate: number;
  }[];
  duration: number;
  notes: string;
  metrics: {
    accuracy: number;
    consistency: number;
    power: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PracticeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  drills: [{
    name: { type: String, required: true },
    repetitions: { type: Number, required: true },
    successRate: { type: Number, required: true }
  }],
  duration: { type: Number, required: true }, // in minutes
  notes: { type: String },
  metrics: {
    accuracy: { type: Number, min: 0, max: 100 },
    consistency: { type: Number, min: 0, max: 100 },
    power: { type: Number, min: 0, max: 100 }
  }
}, { timestamps: true });

export default mongoose.model<IPractice>('Practice', PracticeSchema); 