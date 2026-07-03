import { Router } from 'express';
import { ActivityModel } from '../models/Activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await ActivityModel.find()
    .populate('user', 'username displayName')
    .sort({ completedAt: -1 });

  res.json(activities);
});
