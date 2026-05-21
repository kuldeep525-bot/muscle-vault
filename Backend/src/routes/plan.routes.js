import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import {
  createPlan,
  deletePlan,
  getAllPlan,
  updatePlan,
} from "../controllers/plan.controller.js";

const route = express.Router();

route.post("/createPlan", protect, adminOnly, createPlan);
route.get("/getAll", getAllPlan);
route.put("/updatePlan/:id", protect, adminOnly, updatePlan);
route.delete("/deletePlan/:id", protect, adminOnly, deletePlan);

export default route;
