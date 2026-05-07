import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { CountryService } from './country.service';

const createCountry = catchAsync(async (req, res) => {
  const result = await CountryService.createCountry(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Country created successfully',
    data: result,
  });
});

const getAllCountries = catchAsync(async (req, res) => {
  const result = await CountryService.getAllCountries();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Countries fetched successfully',
    data: result,
  });
});

const getCountryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CountryService.getCountryById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Country fetched successfully',
    data: result,
  });
});

const updateCountry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CountryService.updateCountry(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Country updated successfully',
    data: result,
  });
});

const deleteCountry = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CountryService.deleteCountry(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Country deleted successfully',
    data: null,
  });
});

export const CountryController = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
