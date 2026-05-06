import { TUserRole } from '../../types';

export const USER_ROLES: TUserRole[] = ['admin', 'manager', 'employee', 'user'];

export const USER_SEARCHABLE_FIELDS = ['name', 'email', 'phone'];

export const USER_FILTERABLE_FIELDS = ['role', 'isActive', 'search'];
