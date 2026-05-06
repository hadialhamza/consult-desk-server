import { Types } from 'mongoose';
import { TUserRole } from '../../types';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: TUserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Methods interface for the model
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
