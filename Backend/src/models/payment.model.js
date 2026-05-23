import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },

    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "due", "overdue"],
      default: ["due"],
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
