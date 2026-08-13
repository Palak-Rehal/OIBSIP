import express from "express";

import {
  getDashboard,
  getAllUsers,
} from "../controllers/adminController";

import protect, {
  adminOnly,
} from "../middleware/auth.middleware";


const router = express.Router();


// =====================================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// =====================================================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboard
);


// =====================================================
// ALL USERS
// GET /api/admin/users
// =====================================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


export default router;