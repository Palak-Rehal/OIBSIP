import { Router } from "express";
import {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} from "../controllers/pizza.controller";

const router = Router();

router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);
router.post("/", createPizza);
router.put("/:id", updatePizza);
router.delete("/:id", deletePizza);

export default router;