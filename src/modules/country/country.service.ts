import { ICountry } from './country.interface';
import Country from './country.model';
import { NotFoundError, ConflictError } from '../../errors';

const createCountry = async (payload: ICountry) => {
  const isExist = await Country.findOne({ 
    $or: [{ name: payload.name }, { code: payload.code }] 
  });
  
  if (isExist) {
    throw new ConflictError('Country with this name or code already exists');
  }

  const result = await Country.create(payload);
  return result;
};

const getAllCountries = async () => {
  const result = await Country.find().sort('name').lean();
  return result;
};

const getCountryById = async (id: string) => {
  const result = await Country.findById(id).lean();
  if (!result) throw new NotFoundError('Country not found');
  return result;
};

const updateCountry = async (id: string, payload: Partial<ICountry>) => {
  const result = await Country.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!result) throw new NotFoundError('Country not found');
  return result;
};

const deleteCountry = async (id: string) => {
  const result = await Country.findByIdAndDelete(id).lean();
  if (!result) throw new NotFoundError('Country not found');
  return result;
};

export const CountryService = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
