import express from "express";
import pizzaRoutes from "./routes/pizza.routes";

const app = express();

app.use(express.json());

app.use("/api/pizzas", pizzaRoutes);

app.get("/", (req, res) => {
  res.send("PizzaHub API Running...");
});

export default app;