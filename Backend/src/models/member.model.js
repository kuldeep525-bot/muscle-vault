import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },

    membershipStatus: {
      type: String,
      enum: ["active", "nonActive"],
      default: "nonActive",
    },

    membershipStart: {
      type: String,
    },

    membershipEnd: {
      type: String,
    },
  },
  { timestamps: true },
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
