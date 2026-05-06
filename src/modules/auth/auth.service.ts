import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../user/user.model';
import { ConflictError, UnauthorizedError } from '../../errors';
import { IJwtPayload } from '../../types';

const generateTokens = (payload: IJwtPayload) => {
  const accessToken = jwt.sign(payload, config.jwt.access_secret, {
    expiresIn: config.jwt.access_expires_in as any,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in as any,
  });

  return { accessToken, refreshToken };
};

const register = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  // Check if user exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  const user = await User.create(data);

  const tokenPayload: IJwtPayload = {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const tokens = generateTokens(tokenPayload);

  return {
    user,
    ...tokens,
  };
};

const login = async (data: { email: string; password: string }) => {
  // Find user with password field
  const user = await User.findOne({ email: data.email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!user.isActive) {
    throw new UnauthorizedError('Your account has been deactivated');
  }

  const isPasswordMatch = await user.comparePassword(data.password);
  if (!isPasswordMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const tokenPayload: IJwtPayload = {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const tokens = generateTokens(tokenPayload);

  return {
    user,
    ...tokens,
  };
};

const refreshToken = async (token: string) => {
  // Verify refresh token
  const decoded = jwt.verify(
    token,
    config.jwt.refresh_secret
  ) as IJwtPayload;

  // Check if user still exists
  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const tokenPayload: IJwtPayload = {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(tokenPayload, config.jwt.access_secret, {
    expiresIn: config.jwt.access_expires_in as any,
  });

  return { accessToken };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new UnauthorizedError('User not found');
  return user;
};

export const AuthService = {
  register,
  login,
  refreshToken,
  getMe,
};
