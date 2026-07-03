import { Router } from 'express';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntryModel.find()
    .populate('user', 'username displayName')
    .populate('team', 'name')
    .sort({ rank: 1 });

  res.json(leaderboard);
});
