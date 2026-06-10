import Inquiry from "../models/Inquiry.model.js";

// CREATE INQUIRY — Public
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required",
      });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ALL INQUIRIES — Admin
export const getAllInquiry = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const inquiries = await Inquiry.find(filter).sort({
      createdAt: -1,
    });

    // NEW COUNT
    const newCount = await Inquiry.countDocuments({
      status: "new",
    });

    // EMPTY RESPONSE
    if (inquiries.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No inquiries found",
        total: 0,
        newCount,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiries fetched successfully",
      total: inquiries.length,
      newCount,
      data: inquiries,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE INQUIRY STATUS — Admin
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    inquiry.status = status;

    await inquiry.save();

    return res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      data: inquiry,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE INQUIRY — Admin
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    await Inquiry.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
