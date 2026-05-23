import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const route = express.Router();

route.get("/stats", protect, adminOnly, getDashboardStats);

export default route;
