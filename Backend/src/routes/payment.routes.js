import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import {
  createPayment,
  getAllPayments,
  getMemberPayments,
  getMonthlyPayments,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.js";

const route = express.Router();

// Admin only
route.post("/create", protect, adminOnly, createPayment);
route.get("/getAll", protect, adminOnly, getAllPayments);
route.get("/member/:id", protect, adminOnly, getMemberPayments);
route.get("/monthly/:month", protect, adminOnly, getMonthlyPayments);
route.put("/update/:id", protect, adminOnly, updatePayment);
route.delete("/delete/:id", protect, adminOnly, deletePayment);

export default route;
