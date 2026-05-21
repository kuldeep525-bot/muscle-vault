import Payment from "../models/payment.model.js";
import Member from "../models/member.model.js";

// CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const { memberId, planId, amount, month, status, paidAt } = req.body;

    if (!memberId || !planId || !amount || !month) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Member exist karta hai check karo
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const payment = await Payment.create({
      memberId,
      planId: member.planId,
      amount,
      month,
      status: status || "due",
      paidAt: status === "paid" ? paidAt || new Date() : null,
    });

    if (status === "paid") {
      await Member.findByIdAndUpdate(memberId, {
        membershipStatus: "active",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ALL PAYMENTS
export const getAllPayments = async (req, res) => {
  try {
    const { month, status } = req.query;

    const filter = {};
    if (month) filter.month = month;
    if (status) filter.status = status;

    const payments = await Payment.find(filter)
      .populate({
        path: "memberId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      })
      .populate("planId", "name price duration")
      .sort({ createdAt: -1 });

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payment found",
      });
    }

    return res.status(200).json({
      success: true,
      total: payments.length,
      data: payments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET MEMBER PAYMENTS
export const getMemberPayments = async (req, res) => {
  try {
    const { id } = req.params;

    const payments = await Payment.find({ memberId: id })
      .populate("planId", "name price duration")
      .sort({ createdAt: -1 });

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not pay the fees",
      });
    }

    return res.status(200).json({
      success: true,
      total: payments.length,
      data: payments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET MONTHLY PAYMENTS
export const getMonthlyPayments = async (req, res) => {
  try {
    const { month } = req.params;

    const payments = await Payment.find({ month })
      .populate({
        path: "memberId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      })
      .populate("planId", "name price duration");

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Is month ki koi payment nahi mili",
      });
    }

    // Summary
    const paidCount = payments.filter((p) => p.status === "paid").length;
    const dueCount = payments.filter((p) => p.status === "due").length;
    const overdueCount = payments.filter((p) => p.status === "overdue").length;
    const totalAmount = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    return res.status(200).json({
      success: true,
      total: payments.length,
      summary: {
        paid: paidCount,
        due: dueCount,
        overdue: overdueCount,
        totalCollected: totalAmount,
      },
      data: payments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PAYMENT STATUS
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paidAt } = req.body;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    payment.status = status;

    // Agar paid kiya toh paidAt save karo
    if (status === "paid") {
      payment.paidAt = paidAt || new Date();
    } else {
      payment.paidAt = null;
    }

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE PAYMENT
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await Payment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
