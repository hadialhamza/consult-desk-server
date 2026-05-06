import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse, pick } from '../../shared';
import { UserService } from './user.service';
import { USER_FILTERABLE_FIELDS } from './user.constant';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query as Record<string, unknown>, [...USER_FILTERABLE_FIELDS, 'page', 'limit', 'sort']);
  const result = await UserService.getAllUsers(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  const result = await UserService.updateUserRole(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
};
