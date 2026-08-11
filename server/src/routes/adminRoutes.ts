import express from "express";
import { getDashboard } from "../controllers/adminController";
import  protect from "../middleware/auth.middleware";
import  {adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboard
);

export default router;