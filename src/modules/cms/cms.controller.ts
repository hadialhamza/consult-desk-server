import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CmsService } from "./cms.service";
import pick from "../../shared/pick";

const createContent = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await CmsService.createContent({
    ...req.body,
    author: userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "CMS content created successfully",
    data: result,
  });
});

const getAllContents = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["type", "isPublished", "category", "search"]);
  const result = await CmsService.getAllContents(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "CMS contents fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getContentBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await CmsService.getContentBySlug(slug as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "CMS content fetched successfully",
    data: result,
  });
});

const updateContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CmsService.updateContent(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "CMS content updated successfully",
    data: result,
  });
});

const deleteContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CmsService.deleteContent(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "CMS content deleted successfully",
    data: null,
  });
});

export const CmsController = {
  createContent,
  getAllContents,
  getContentBySlug,
  updateContent,
  deleteContent,
};
