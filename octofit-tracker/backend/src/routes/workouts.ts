import { Router } from 'express';
import { WorkoutModel } from '../models/Workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await WorkoutModel.find()
    .populate('suggestedFor', 'username displayName')
    .sort({ title: 1 });

  res.json(workouts);
});
