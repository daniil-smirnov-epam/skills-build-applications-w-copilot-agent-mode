import { Router } from 'express';
import { TeamModel } from '../models/Team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await TeamModel.find().populate('members', 'username displayName').sort({ name: 1 });
  res.json(teams);
});
