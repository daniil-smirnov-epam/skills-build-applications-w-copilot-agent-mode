import { model, Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank: number;
  period: string;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true, default: 'all-time' },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
