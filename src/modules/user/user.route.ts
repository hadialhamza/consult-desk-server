import { Router } from 'express';
import { UserController } from './user.controller';
import { auth, validateRequest } from '../../middleware';
import { updateUserValidation, updateUserRoleValidation } from './user.validation';

const router = Router();

// GET /api/users — Admin only
router.get('/', auth('admin'), UserController.getAllUsers);

// GET /api/users/:id — Authenticated users
router.get('/:id', auth('admin', 'manager', 'employee', 'user'), UserController.getUserById);

// PATCH /api/users/:id — User can update own profile
router.patch(
  '/:id',
  auth('admin', 'manager', 'employee', 'user'),
  validateRequest(updateUserValidation),
  UserController.updateUser
);

// DELETE /api/users/:id — Admin only
router.delete('/:id', auth('admin'), UserController.deleteUser);

// PATCH /api/users/role — Admin only
router.patch(
  '/role',
  auth('admin'),
  validateRequest(updateUserRoleValidation),
  UserController.updateUserRole
);

export const UserRoutes = router;
