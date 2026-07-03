import { Router } from 'express';
import { UserModel } from '../models/User.js';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await UserModel.find().sort({ username: 1 });
  res.json(users);
});
