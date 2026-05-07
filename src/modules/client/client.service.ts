import { IClient } from './client.interface';
import Client from './client.model';
import { IQueryFilters } from '../../types';
import { NotFoundError } from '../../errors';
import { CLIENT_SEARCHABLE_FIELDS } from './client.constant';

const createClient = async (payload: IClient) => {
  const result = await Client.create(payload);
  return result;
};

const getAllClients = async (filters: IQueryFilters) => {
  const { search, page = 1, limit = 10, sort = '-createdAt', ...filterData } = filters;

  const conditions: any[] = [];

  // Search
  if (search) {
    conditions.push({
      $or: CLIENT_SEARCHABLE_FIELDS.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  // Exact Filters
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
    Client.find(whereConditions)
      .populate('country')
      .populate('assignedTo', 'name email role')
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Client.countDocuments(whereConditions),
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

const getClientById = async (id: string) => {
  const result = await Client.findById(id)
    .populate('country')
    .populate('assignedTo', 'name email role')
    .lean();
  if (!result) throw new NotFoundError('Client not found');
  return result;
};

const updateClient = async (id: string, payload: Partial<IClient>) => {
  const result = await Client.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!result) throw new NotFoundError('Client not found');
  return result;
};

const deleteClient = async (id: string) => {
  const result = await Client.findByIdAndDelete(id).lean();
  if (!result) throw new NotFoundError('Client not found');
  return result;
};

export const ClientService = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
