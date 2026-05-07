import { IVisaService } from './visaService.interface';
import VisaService from './visaService.model';
import { IQueryFilters } from '../../types';
import { NotFoundError } from '../../errors';
import { VISA_SERVICE_SEARCHABLE_FIELDS } from './visaService.constant';

const createVisaService = async (payload: IVisaService) => {
  const result = await VisaService.create(payload);
  return result;
};

const getAllVisaServices = async (filters: IQueryFilters) => {
  const { search, page = 1, limit = 10, sort = '-createdAt', feeMin, feeMax, rating, ...filterData } = filters;

  const conditions: any[] = [];

  // Search
  if (search) {
    conditions.push({
      $or: VISA_SERVICE_SEARCHABLE_FIELDS.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  // Price Range
  if (feeMin !== undefined || feeMax !== undefined) {
    const feeFilter: any = {};
    if (feeMin !== undefined) feeFilter.$gte = Number(feeMin);
    if (feeMax !== undefined) feeFilter.$lte = Number(feeMax);
    conditions.push({ fee: feeFilter });
  }

  // Rating
  if (rating !== undefined) {
    conditions.push({ rating: { $gte: Number(rating) } });
  }

  // Exact Filters (e.g., country, visaType, category)
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
    VisaService.find(whereConditions)
      .populate('country')
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    VisaService.countDocuments(whereConditions),
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

const getVisaServiceById = async (id: string) => {
  const result = await VisaService.findById(id).populate('country').lean();
  if (!result) throw new NotFoundError('Visa Service not found');
  return result;
};

const updateVisaService = async (id: string, payload: Partial<IVisaService>) => {
  const result = await VisaService.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!result) throw new NotFoundError('Visa Service not found');
  return result;
};

const deleteVisaService = async (id: string) => {
  const result = await VisaService.findByIdAndDelete(id).lean();
  if (!result) throw new NotFoundError('Visa Service not found');
  return result;
};

export const VisaServiceService = {
  createVisaService,
  getAllVisaServices,
  getVisaServiceById,
  updateVisaService,
  deleteVisaService,
};
