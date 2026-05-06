import User from './user.model';
import { IUser } from './user.interface';
import { IQueryFilters } from '../../types';
import { NotFoundError } from '../../errors';
import { USER_SEARCHABLE_FIELDS } from './user.constant';

const getAllUsers = async (filters: IQueryFilters) => {
  const { search, page = 1, limit = 10, sort = '-createdAt', ...filterData } = filters;

  const conditions: any[] = [];

  // Search
  if (search) {
    conditions.push({
      $or: USER_SEARCHABLE_FIELDS.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  // Filters
  if (Object.keys(filterData).length) {
    conditions.push({
      $and: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions = conditions.length ? { $and: conditions } : {};
  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    User.find(whereConditions)
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    User.countDocuments(whereConditions),
  ]);

  return {
    data,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getUserById = async (id: string) => {
  const user = await User.findById(id).lean();
  if (!user) throw new NotFoundError('User not found');
  return user;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!user) throw new NotFoundError('User not found');
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) throw new NotFoundError('User not found');
  return user;
};

const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  ).lean();
  if (!user) throw new NotFoundError('User not found');
  return user;
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
};
