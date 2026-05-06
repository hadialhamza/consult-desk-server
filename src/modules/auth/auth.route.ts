import { Router } from 'express';
import { AuthController } from './auth.controller';
import { auth, validateRequest } from '../../middleware';
import { registerValidation, loginValidation } from './auth.validation';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRequest(registerValidation), AuthController.register);

// POST /api/auth/login
router.post('/login', validateRequest(loginValidation), AuthController.login);

// POST /api/auth/refresh-token
router.post('/refresh-token', AuthController.refreshToken);

// GET /api/auth/me — Get current user profile
router.get('/me', auth('admin', 'manager', 'employee', 'user'), AuthController.getMe);

export const AuthRoutes = router;
