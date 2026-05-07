import { ICmsContent } from "./cms.interface";
import CmsContent from "./cms.model";
import { IQueryFilters } from "../../types";
import { NotFoundError } from "../../errors";

const createContent = async (payload: ICmsContent) => {
  // Simple slug generation
  const slug = payload.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  
  payload.slug = slug;

  const result = await CmsContent.create(payload);
  return result;
};

const getAllContents = async (filters: IQueryFilters) => {
  const { search, page = 1, limit = 10, sort = "-createdAt", isPublished, ...filterData } = filters;

  const conditions: any[] = [];

  // Search
  if (search) {
    conditions.push({
      $or: ["title", "content", "category"].map((field) => ({
        [field]: { $regex: search, $options: "i" },
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

  // Status Filter (Special handling for public access)
  if (isPublished !== undefined) {
    conditions.push({ isPublished: isPublished === "true" });
  }

  const whereConditions = conditions.length ? { $and: conditions } : {};
  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    CmsContent.find(whereConditions)
      .populate("author", "name email")
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    CmsContent.countDocuments(whereConditions),
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

const getContentBySlug = async (slug: string) => {
  const result = await CmsContent.findOne({ slug, isPublished: true })
    .populate("author", "name email")
    .lean();
  if (!result) throw new NotFoundError("Content not found");
  return result;
};

const updateContent = async (id: string, payload: Partial<ICmsContent>) => {
  if (payload.title) {
    payload.slug = payload.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  const result = await CmsContent.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!result) throw new NotFoundError("Content not found");
  return result;
};

const deleteContent = async (id: string) => {
  const result = await CmsContent.findByIdAndDelete(id).lean();
  if (!result) throw new NotFoundError("Content not found");
  return result;
};

export const CmsService = {
  createContent,
  getAllContents,
  getContentBySlug,
  updateContent,
  deleteContent,
};
