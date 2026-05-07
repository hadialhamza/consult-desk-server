import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { VisaServiceService } from './visaService.service';
import pick from '../../shared/pick';
import { VISA_SERVICE_FILTERABLE_FIELDS } from './visaService.constant';

const createVisaService = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await VisaServiceService.createVisaService({
    ...req.body,
    createdBy: userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Visa Service created successfully',
    data: result,
  });
});

const getAllVisaServices = catchAsync(async (req, res) => {
  const filters = pick(req.query, VISA_SERVICE_FILTERABLE_FIELDS);
  const result = await VisaServiceService.getAllVisaServices(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Visa Services fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getVisaServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VisaServiceService.getVisaServiceById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Visa Service fetched successfully',
    data: result,
  });
});

const updateVisaService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VisaServiceService.updateVisaService(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Visa Service updated successfully',
    data: result,
  });
});

const deleteVisaService = catchAsync(async (req, res) => {
  const { id } = req.params;
  await VisaServiceService.deleteVisaService(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Visa Service deleted successfully',
    data: null,
  });
});

export const VisaServiceController = {
  createVisaService,
  getAllVisaServices,
  getVisaServiceById,
  updateVisaService,
  deleteVisaService,
};
