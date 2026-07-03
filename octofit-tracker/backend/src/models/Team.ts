import { model, Schema, Types } from 'mongoose';

export interface Team {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const TeamModel = model<Team>('Team', teamSchema);
