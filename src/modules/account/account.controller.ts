import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AccountService } from "./account.service";
import pick from "../../shared/pick";
import { ACCOUNT_FILTERABLE_FIELDS } from "./account.constant";

const createAccountEntry = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await AccountService.createAccountEntry({
    ...req.body,
    createdBy: userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Accounting entry created successfully",
    data: result,
  });
});

const getAllAccountEntries = catchAsync(async (req, res) => {
  const filters = pick(req.query, ACCOUNT_FILTERABLE_FIELDS);
  const result = await AccountService.getAllAccountEntries(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Accounting entries fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAccountSummary = catchAsync(async (req, res) => {
  const result = await AccountService.getAccountSummary();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Accounting summary fetched successfully",
    data: result,
  });
});

export const AccountController = {
  createAccountEntry,
  getAllAccountEntries,
  getAccountSummary,
};
