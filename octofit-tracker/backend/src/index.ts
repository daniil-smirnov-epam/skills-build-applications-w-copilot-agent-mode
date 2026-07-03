import express from 'express';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

connectToDatabase().catch((error) => {
  console.error('Database connection setup failed:', error);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
