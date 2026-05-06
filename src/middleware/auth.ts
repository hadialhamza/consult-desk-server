import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthorizedError, ForbiddenError } from '../errors';
import { IJwtPayload, TUserRole } from '../types';

/**
 * Authentication middleware — verifies JWT access token from Authorization header.
 */
const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Access token is required');
      }

      const token = authHeader.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        config.jwt.access_secret
      ) as IJwtPayload;

      req.user = decoded;

      // Role-based authorization
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ForbiddenError(
          'You do not have permission to perform this action'
        );
      }

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new UnauthorizedError('Invalid or expired token'));
      } else {
        next(error);
      }
    }
  };
};

export default auth;
