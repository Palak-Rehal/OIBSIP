import express from "express";
import authMiddleware, {
  adminOnly,
} from "../middleware/auth.middleware";

import {
  getInventory,
  updateInventory,
} from "../controllers/inventory.controller";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminOnly,
  getInventory
);

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  updateInventory
);

export default router;