import { model, Schema, Types } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  suggestedFor: Types.ObjectId[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    suggestedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    versionKey: false,
  },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
