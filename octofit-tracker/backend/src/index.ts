import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import mongoose from 'mongoose';
import { getApiBaseUrl } from './config/api.js';
import { connectToDatabase } from './config/database.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

const requireDatabaseConnection: RequestHandler = (_req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'Database unavailable' });
    return;
  }

  next();
};

app.use('/api/users', requireDatabaseConnection, usersRouter);
app.use('/api/teams', requireDatabaseConnection, teamsRouter);
app.use('/api/activities', requireDatabaseConnection, activitiesRouter);
app.use('/api/leaderboard', requireDatabaseConnection, leaderboardRouter);
app.use('/api/workouts', requireDatabaseConnection, workoutsRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error('Request failed:', error);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

connectToDatabase().catch((error) => {
  console.error('Database connection setup failed:', error);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
