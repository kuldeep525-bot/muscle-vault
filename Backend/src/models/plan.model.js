import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // months mein — 1, 3, 12
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
