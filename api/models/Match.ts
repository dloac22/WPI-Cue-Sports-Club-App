import mongoose, { Document, Schema } from 'mongoose';

export interface IMatch extends Document {
  leagueId: mongoose.Types.ObjectId;
  player1Id: mongoose.Types.ObjectId;
  player2Id: mongoose.Types.ObjectId;
  score1: number;
  score2: number;
  week: number;
  matchDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  handicap: {
    player1Handicap: number;
    player2Handicap: number;
    reason: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema({
  leagueId: { type: Schema.Types.ObjectId, ref: 'League', required: true },
  player1Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  player2Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  week: { type: Number, required: true },
  matchDate: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  handicap: {
    player1Handicap: { type: Number, default: 0 },
    player2Handicap: { type: Number, default: 0 },
    reason: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IMatch>('Match', MatchSchema); 