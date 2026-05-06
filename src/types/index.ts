import { JwtPayload } from 'jsonwebtoken';

// ── Standard API Response ──
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: IMeta;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ── Error Response ──
export interface IErrorMessage {
  path: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
}

// ── Query Filters ──
export interface IQueryFilters {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: unknown;
}

// ── JWT Payload ──
export interface IJwtPayload extends JwtPayload {
  userId: string;
  role: TUserRole;
  email: string;
}

// ── User Roles ──
export type TUserRole = 'admin' | 'manager' | 'employee' | 'user';

// ── Visa Application Status ──
export type TApplicationStatus =
  | 'new'
  | 'processing'
  | 'approved'
  | 'rejected';

// ── Account Types ──
export type TAccountType = 'income' | 'expense';

// ── Extend Express Request ──
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
