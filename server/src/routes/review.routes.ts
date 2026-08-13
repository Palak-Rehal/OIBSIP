import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  addReview,
  getPizzaReviews,
  updateReview,
  deleteReview,
   getAllReviews,
} from "../controllers/review.controller";
import adminMiddleware from "../middleware/admin.middleware";

const router = Router();

router.post("/", authMiddleware, addReview);

router.get("/:pizzaId", getPizzaReviews);

router.put("/:id", authMiddleware, updateReview);

router.delete("/:id", authMiddleware, deleteReview);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllReviews
);
export default router;