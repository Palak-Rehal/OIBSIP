import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";


import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

// Reset Password
router.put(
  "/reset-password/:token",
  resetPassword
);

// Get Logged In User
router.get("/profile", authMiddleware, getProfile);

// Update Logged In User
router.put("/profile", authMiddleware, updateProfile);

router.get(
  "/verify-email/:token",
  verifyEmail
);

export default router;