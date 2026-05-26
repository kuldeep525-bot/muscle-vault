import Member from "../models/member.model.js";
import Plan from "../models/plan.model.js";

export const getAllMember = async (req, res) => {
  try {
    const members = await Member.find()
      .populate("userId", "name email phone")
      .populate("planId", "name price duration");

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    return res.status(200).json({
      success: true,
      total: members.length,
      data: members,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMember = async (req, res) => {
  try {
    const _id = req.params._id;

    const member = await Member.findById(_id)
      .populate("userId", "name email phone")
      .populate("planId", "name price duration");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member found successfully",
      data: member,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllActiveMember = async (req, res) => {
  try {
    const members = await Member.find({ membershipStatus: "active" })
      .populate("userId", "name email phone")
      .populate("planId", "name price duration");

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not any Member can active now",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Total active member",
      total: members.length,
      data: members,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { membershipStatus, membershipStart, membershipEnd } = req.body;
    const _id = req.params._id;

    const member = await Member.findById(_id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.membershipStatus = membershipStatus;
    member.membershipStart = membershipStart;
    member.membershipEnd = membershipEnd;

    await member.save();

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const _id = req.params._id;

    const member = await Member.findById(_id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    await Member.findByIdAndDelete(_id);

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      data: member,
    });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const assignPlan = async (req, res) => {
  try {
    const { _id } = req.params;
    const { planId } = req.body;

    const member = await Member.findById(_id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Plan exist karta hai check karo
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    member.planId = planId;
    member.membershipStatus = "active";

    await member.save();

    return res.status(200).json({
      success: true,
      message: "Plan assigned successfully",
      data: member,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const checkExpiry = async (req, res) => {
  try {
    // Aaj ki date
    const today = new Date();

    // Saare active members dhundo
    const members = await Member.find({
      membershipStatus: "active",
    });

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Koi active member nahi hai",
      });
    }

    // Har member ki end date check karo
    let expiredCount = 0;

    for (const member of members) {
      // String ko Date mein convert karo
      const endDate = new Date(member.membershipEnd);

      if (member.membershipEnd && endDate < today) {
        member.membershipStatus = "nonActive";
        await member.save();
        expiredCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `${expiredCount} members ki membership expire ho gayi`,
      expiredCount,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
