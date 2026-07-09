import { Router } from "express";
import {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} from "../controllers/pizza.controller";

import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";
import { pizzaValidation } from "../validations/pizza.validation";

const router = Router();

// Public Routes
router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);

// Admin Routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  pizzaValidation,
  createPizza
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  pizzaValidation,
  updatePizza
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePizza
);

export default router;