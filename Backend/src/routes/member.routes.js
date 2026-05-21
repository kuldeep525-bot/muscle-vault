import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import {
  assignPlan,
  checkExpiry,
  deleteMember,
  getAllActiveMember,
  getAllMember,
  getMember,
  updateMember,
} from "../controllers/member.controller.js";

const route = express.Router();

route.get("/getAll", protect, adminOnly, getAllMember);
route.get("/get/:_id", protect, adminOnly, getMember);
route.get("/getAllActive", protect, adminOnly, getAllActiveMember);
route.put("/updateMember/:_id", protect, adminOnly, updateMember);
route.delete("/deleteMember/:_id", protect, adminOnly, deleteMember);
route.patch("/assignPlan/:_id", protect, adminOnly, assignPlan);
route.get("/checkExpiry/:_id", protect, adminOnly, checkExpiry);

export default route;
