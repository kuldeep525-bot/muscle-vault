import express from "express";
import {
  resetPassword,
  forgotPassword,
  login,
  logout,
  register,
  verifyOtp,
} from "../controllers/user.controllers.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.post("/forgot-password", forgotPassword);
route.post("/verify-otp", verifyOtp);
route.post("/reset-password", resetPassword);

export default route;
