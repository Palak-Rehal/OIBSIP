import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { placeOrder } from "../controllers/order.controller";
import adminMiddleware from "../middleware/admin.middleware";

import {
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/cancel/:id", authMiddleware, cancelOrder);
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);
router.put(
  "/admin/update/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

export default router;