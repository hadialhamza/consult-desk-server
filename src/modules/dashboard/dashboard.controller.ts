import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DashboardService } from "./dashboard.service";

const getStats = catchAsync(async (req, res) => {
  const result = await DashboardService.getStats();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Dashboard stats fetched successfully",
    data: result,
  });
});

const getChartData = catchAsync(async (req, res) => {
  const result = await DashboardService.getChartData();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Chart data fetched successfully",
    data: result,
  });
});

const getPublicStats = catchAsync(async (req, res) => {
  const result = await DashboardService.getPublicStats();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Public stats fetched successfully",
    data: result,
  });
});

export const DashboardController = {
  getStats,
  getPublicStats,
  getChartData,
};
