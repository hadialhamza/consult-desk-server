import User from "../user/user.model";
import Client from "../client/client.model";
import Booking from "../booking/booking.model";
import Account from "../account/account.model";
import Country from "../country/country.model";

const getStats = async () => {
  const [userCount, clientCount, bookingCount, accountStats] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Client.countDocuments(),
    Booking.countDocuments(),
    Account.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  const financialSummary = {
    income: 0,
    expense: 0,
  };

  accountStats.forEach((stat) => {
    if (stat._id === "income") financialSummary.income = stat.total;
    if (stat._id === "expense") financialSummary.expense = stat.total;
  });

  return {
    totalUsers: userCount,
    totalClients: clientCount,
    totalBookings: bookingCount,
    totalRevenue: financialSummary.income,
    netProfit: financialSummary.income - financialSummary.expense,
  };
};

const getPublicStats = async () => {
  const [clientCount, countryCount, bookingCount] = await Promise.all([
    Client.countDocuments(),
    Country.countDocuments(),
    Booking.countDocuments(),
  ]);

  return {
    totalClients: clientCount, 
    totalCountries: countryCount,
    totalBookings: bookingCount,
    successRate: 98,
  };
};

const getChartData = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const bookingsByMonth = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
        revenue: { $sum: "$totalFee" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  return bookingsByMonth;
};

export const DashboardService = {
  getStats,
  getPublicStats,
  getChartData,
};
