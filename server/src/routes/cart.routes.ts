import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// Add pizza to cart
router.post("/add", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

router.put("/update/:id", authMiddleware, updateCart);

router.delete("/remove/:id", authMiddleware, removeCartItem);

router.delete("/clear", authMiddleware, clearCart);

export default router;
