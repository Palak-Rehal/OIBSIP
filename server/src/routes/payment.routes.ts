import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createPaymentOrder } from "../controllers/payment.controller";
import {
  verifyPayment,
} from "../controllers/payment.controller";
const router = Router();

router.post(
  "/create-order",
  authMiddleware,
  createPaymentOrder
);
router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);

export default router;