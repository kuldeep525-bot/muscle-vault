import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
    },

    message: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
