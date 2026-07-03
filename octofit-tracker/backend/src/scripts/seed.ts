import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const userIds = {
      maya: new mongoose.Types.ObjectId(),
      jordan: new mongoose.Types.ObjectId(),
      priya: new mongoose.Types.ObjectId(),
      theo: new mongoose.Types.ObjectId(),
    };

    await UserModel.insertMany([
      {
        _id: userIds.maya,
        username: 'maya-runner',
        email: 'maya.runner@example.com',
        displayName: 'Maya Chen',
        profileImage: 'https://example.com/profiles/maya.png',
        createdAt: new Date('2026-01-12T09:00:00Z'),
      },
      {
        _id: userIds.jordan,
        username: 'jordan-lifts',
        email: 'jordan.lifts@example.com',
        displayName: 'Jordan Smith',
        profileImage: 'https://example.com/profiles/jordan.png',
        createdAt: new Date('2026-01-18T14:30:00Z'),
      },
      {
        _id: userIds.priya,
        username: 'priya-yoga',
        email: 'priya.yoga@example.com',
        displayName: 'Priya Patel',
        profileImage: 'https://example.com/profiles/priya.png',
        createdAt: new Date('2026-02-02T11:15:00Z'),
      },
      {
        _id: userIds.theo,
        username: 'theo-cycles',
        email: 'theo.cycles@example.com',
        displayName: 'Theo Garcia',
        profileImage: 'https://example.com/profiles/theo.png',
        createdAt: new Date('2026-02-10T16:45:00Z'),
      },
    ]);

    const teamIds = {
      trailblazers: new mongoose.Types.ObjectId(),
      powerSquad: new mongoose.Types.ObjectId(),
    };

    await TeamModel.insertMany([
      {
        _id: teamIds.trailblazers,
        name: 'Trail Blazers',
        description: 'Outdoor runners and cyclists chasing weekly distance goals.',
        members: [userIds.maya, userIds.theo],
        createdAt: new Date('2026-02-15T10:00:00Z'),
      },
      {
        _id: teamIds.powerSquad,
        name: 'Power Squad',
        description: 'Strength training group focused on consistency and form.',
        members: [userIds.jordan, userIds.priya],
        createdAt: new Date('2026-02-20T10:00:00Z'),
      },
    ]);

    await ActivityModel.insertMany([
      {
        user: userIds.maya,
        activityType: 'Running',
        durationMinutes: 45,
        caloriesBurned: 430,
        completedAt: new Date('2026-03-01T12:30:00Z'),
      },
      {
        user: userIds.jordan,
        activityType: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 520,
        completedAt: new Date('2026-03-02T18:00:00Z'),
      },
      {
        user: userIds.priya,
        activityType: 'Yoga',
        durationMinutes: 50,
        caloriesBurned: 210,
        completedAt: new Date('2026-03-03T07:15:00Z'),
      },
      {
        user: userIds.theo,
        activityType: 'Cycling',
        durationMinutes: 75,
        caloriesBurned: 680,
        completedAt: new Date('2026-03-04T13:45:00Z'),
      },
      {
        user: userIds.maya,
        activityType: 'Interval Training',
        durationMinutes: 35,
        caloriesBurned: 390,
        completedAt: new Date('2026-03-05T11:00:00Z'),
      },
    ]);

    await LeaderboardEntryModel.insertMany([
      {
        user: userIds.theo,
        team: teamIds.trailblazers,
        score: 1280,
        rank: 1,
        period: 'weekly',
        updatedAt: new Date('2026-03-05T20:00:00Z'),
      },
      {
        user: userIds.maya,
        team: teamIds.trailblazers,
        score: 1180,
        rank: 2,
        period: 'weekly',
        updatedAt: new Date('2026-03-05T20:00:00Z'),
      },
      {
        user: userIds.jordan,
        team: teamIds.powerSquad,
        score: 1040,
        rank: 3,
        period: 'weekly',
        updatedAt: new Date('2026-03-05T20:00:00Z'),
      },
      {
        user: userIds.priya,
        team: teamIds.powerSquad,
        score: 860,
        rank: 4,
        period: 'weekly',
        updatedAt: new Date('2026-03-05T20:00:00Z'),
      },
    ]);

    await WorkoutModel.insertMany([
      {
        title: '5K Tempo Builder',
        description: 'Warm up, run three tempo intervals, and cool down to improve race pace.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        suggestedFor: [userIds.maya, userIds.theo],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'Compound lifts and bodyweight finishers for balanced strength development.',
        difficulty: 'advanced',
        durationMinutes: 55,
        suggestedFor: [userIds.jordan],
      },
      {
        title: 'Recovery Mobility Flow',
        description: 'Low-impact yoga sequence for flexibility, balance, and active recovery.',
        difficulty: 'beginner',
        durationMinutes: 30,
        suggestedFor: [userIds.priya, userIds.maya],
      },
      {
        title: 'Indoor Cycling Endurance',
        description: 'Steady-state ride with cadence drills to build aerobic endurance.',
        difficulty: 'intermediate',
        durationMinutes: 50,
        suggestedFor: [userIds.theo, userIds.jordan],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
