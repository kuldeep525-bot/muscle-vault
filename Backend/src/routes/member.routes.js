import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import {
  getAllActiveMember,
  getAllMember,
  getMember,
  updateMember,
} from "../controllers/member.controller.js";

const route = express.Router();

route.get("/getAll", protect, adminOnly, getAllMember);
route.get("/get/:_id", protect, adminOnly, getMember);
route.get("/getAllActive", protect, adminOnly, getAllActiveMember);
route.get("/updateMember/:_id", protect, adminOnly, updateMember);

export default route;
