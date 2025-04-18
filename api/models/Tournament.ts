import mongoose, { Document, Schema } from 'mongoose';

export interface ITournament extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  format: string;
  participants: mongoose.Types.ObjectId[];
  brackets: {
    round: number;
    matches: {
      _id: mongoose.Types.ObjectId;
      player1Id?: mongoose.Types.ObjectId;
      player2Id?: mongoose.Types.ObjectId;
      winnerId?: mongoose.Types.ObjectId;
      score1?: number;
      score2?: number;
    }[];
  }[];
  status: 'upcoming' | 'active' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const TournamentSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  format: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  brackets: [{
    round: { type: Number, required: true },
    matches: [{
      _id: { type: Schema.Types.ObjectId, auto: true },
      player1Id: { type: Schema.Types.ObjectId, ref: 'User' },
      player2Id: { type: Schema.Types.ObjectId, ref: 'User' },
      winnerId: { type: Schema.Types.ObjectId, ref: 'User' },
      score1: { type: Number },
      score2: { type: Number }
    }]
  }],
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' }
}, { timestamps: true });

export default mongoose.model<ITournament>('Tournament', TournamentSchema); 