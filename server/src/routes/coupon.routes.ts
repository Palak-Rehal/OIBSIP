import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";

import {
  createCoupon,
  getCoupons,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from "../controllers/coupon.controller";

const router = Router();

/*
    ADMIN ROUTES
*/

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCoupon
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getCoupons
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCoupon
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCoupon
);

router.patch(
  "/toggle/:id",
  authMiddleware,
  adminMiddleware,
  toggleCouponStatus
);

/*
    USER ROUTE
*/

router.post(
  "/validate",
  authMiddleware,
  validateCoupon
);

export default router;