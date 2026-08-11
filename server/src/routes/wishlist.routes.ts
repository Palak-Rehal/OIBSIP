import { Router } from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getWishlist);
router.post("/:pizzaId", authMiddleware, addToWishlist);
router.delete("/:pizzaId", authMiddleware, removeFromWishlist);

export default router;