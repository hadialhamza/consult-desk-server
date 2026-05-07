import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ClientService } from './client.service';
import pick from '../../shared/pick';
import { CLIENT_FILTERABLE_FIELDS } from './client.constant';

const createClient = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await ClientService.createClient({
    ...req.body,
    createdBy: userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Client created successfully',
    data: result,
  });
});

const getAllClients = catchAsync(async (req, res) => {
  const filters = pick(req.query, CLIENT_FILTERABLE_FIELDS);
  const result = await ClientService.getAllClients(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Clients fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getClientById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClientService.getClientById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Client fetched successfully',
    data: result,
  });
});

const updateClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClientService.updateClient(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Client updated successfully',
    data: result,
  });
});

const deleteClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ClientService.deleteClient(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Client deleted successfully',
    data: null,
  });
});

export const ClientController = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
