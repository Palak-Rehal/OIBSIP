import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  addReview,
  getPizzaReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";

const router = Router();

router.post("/", authMiddleware, addReview);

router.get("/:pizzaId", getPizzaReviews);

router.put("/:id", authMiddleware, updateReview);

router.delete("/:id", authMiddleware, deleteReview);

export default router;