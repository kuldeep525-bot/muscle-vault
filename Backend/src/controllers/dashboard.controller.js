// import Member from "../models/member.model.js";
// import Payment from "../models/payment.model.js";
// import Inquiry from "../models/inquiry.model.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     // Total members
//     const totalMembers = await Member.countDocuments();

//     // Active members
//     const activeMembers = await Member.countDocuments({
//       membershipStatus: "active",
//     });

//     // Total inquiries
//     const totalInquiries = await Inquiry.countDocuments();

//     // New inquiries
//     const newInquiries = await Inquiry.countDocuments({
//       status: "new",
//     });

//     // // Is month ki revenue
//     // const currentMonth = new Date().toLocaleString("default", {
//     //   month: "long",
//     //   year: "numeric",
//     // });
//     // const monthlyPayments = await Payment.find({
//     //   month: currentMonth,
//     //   status: "paid",
//     // });
//     // const totalRevenue = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);

//     // // Expiring soon — next 7 days
//     // const today = new Date();
//     // const next7Days = new Date();
//     // next7Days.setDate(today.getDate() + 7);
//     // const expiringSoon = await Member.countDocuments({
//     //   membershipStatus: "active",
//     //   membershipEnd: { $gte: today, $lte: next7Days },
//     // });

//     // Chart data — monthly
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const year = new Date().getFullYear();

//     const monthlyData = await Promise.all(
//       months.map(async (month, index) => {
//         const membersCount = await Member.countDocuments({
//           createdAt: {
//             $gte: new Date(year, index, 1),
//             $lt: new Date(year, index + 1, 1),
//           },
//         });
//         const payments = await Payment.find({
//           month: `${month} ${year}`,
//           status: "paid",
//         });
//         const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
//         return { month, members: membersCount, revenue };
//       }),
//     );

//     return res.status(200).json({
//       success: true,
//       data: {
//         totalMembers,
//         activeMembers,
//         totalInquiries,
//         newInquiries,
//         totalRevenue,
//         expiringSoon,
//         monthlyData,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

import Inquiry from "../models/inquiry.model.js";
import Member from "../models/member.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      membershipStatus: "active",
    });

    const totalInquiries = await Inquiry.countDocuments();

    const newInquiries = await Inquiry.countDocuments({
      status: "new",
    });

    // Chart data
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = new Date().getFullYear();

    const monthlyData = await Promise.all(
      months.map(async (month, index) => {
        const membersCount = await Member.countDocuments({
          createdAt: {
            $gte: new Date(year, index, 1),
            $lt: new Date(year, index + 1, 1),
          },
        });
        return { month, members: membersCount };
      }),
    );

    return res.status(200).json({
      success: true,
      data: {
        totalMembers,
        activeMembers,
        totalInquiries,
        newInquiries,
        monthlyData,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
