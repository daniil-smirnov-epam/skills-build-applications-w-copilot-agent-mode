import { model, Schema } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  profileImage?: string;
  createdAt: Date;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    profileImage: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<User>('User', userSchema);
