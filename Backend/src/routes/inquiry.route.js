import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import {
  createInquiry,
  getAllInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";

const route = express.Router();

// Public — koi bhi bhej sakta hai
route.post("/create", createInquiry);

// Admin only
route.get("/getAll", protect, adminOnly, getAllInquiry);
route.put("/update/:id", protect, adminOnly, updateInquiry);
route.delete("/delete/:id", protect, adminOnly, deleteInquiry);

export default route;
