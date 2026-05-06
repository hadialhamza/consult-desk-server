import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../shared';
import { AuthService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  // Set refresh token in cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Registration successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  // Set refresh token in cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe(req.user!.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  refreshToken,
  getMe,
};
