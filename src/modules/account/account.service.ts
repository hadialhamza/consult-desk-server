import { IAccount } from "./account.interface";
import Account from "./account.model";
import { IQueryFilters } from "../../types";
import { ACCOUNT_SEARCHABLE_FIELDS } from "./account.constant";

const createAccountEntry = async (payload: IAccount) => {
  const result = await Account.create(payload);
  return result;
};

const getAllAccountEntries = async (filters: IQueryFilters) => {
  const { search, page = 1, limit = 10, sort = "-date", startDate, endDate, ...filterData } = filters;

  const conditions: any[] = [];

  // Search
  if (search) {
    conditions.push({
      $or: ACCOUNT_SEARCHABLE_FIELDS.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    });
  }

  // Date Range
  if (startDate || endDate) {
    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);
    conditions.push({ date: dateFilter });
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
    Account.find(whereConditions)
      .populate("createdBy", "name email")
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Account.countDocuments(whereConditions),
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

const getAccountSummary = async () => {
  const stats = await Account.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const summary = {
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
  };

  stats.forEach((stat) => {
    if (stat._id === "income") summary.totalIncome = stat.total;
    if (stat._id === "expense") summary.totalExpense = stat.total;
  });

  summary.netProfit = summary.totalIncome - summary.totalExpense;

  // Monthly breakdown for charts
  const monthlyBreakdown = await Account.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return {
    overview: summary,
    monthlyBreakdown,
  };
};

export const AccountService = {
  createAccountEntry,
  getAllAccountEntries,
  getAccountSummary,
};
