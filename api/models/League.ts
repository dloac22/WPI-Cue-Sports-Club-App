import mongoose, { Document, Schema } from 'mongoose';

export interface ILeague extends Document {
  name: string;
  term: string;
  year: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'upcoming';
  handicapRules: {
    skillGap: number;
    handicapRacks: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const LeagueSchema = new Schema({
  name: { type: String, required: true },
  term: { type: String, required: true },
  year: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'completed', 'upcoming'], default: 'upcoming' },
  handicapRules: [{
    skillGap: { type: Number, required: true },
    handicapRacks: { type: Number, required: true }
  }]
}, { timestamps: true });

// Add default handicap rules
LeagueSchema.pre('save', function(next) {
  if (!this.handicapRules || this.handicapRules.length === 0) {
    this.handicapRules = [
      { skillGap: 2, handicapRacks: 2 }, // Expert vs Beginner
      { skillGap: 1, handicapRacks: 1 }  // Expert vs Intermediate or Intermediate vs Beginner
    ];
  }
  next();
});

export default mongoose.model<ILeague>('League', LeagueSchema); 