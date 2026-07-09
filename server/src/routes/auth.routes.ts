import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Logged In User
router.get("/profile", authMiddleware, getProfile);

// Update Logged In User
router.put("/profile", authMiddleware, updateProfile);

export default router;