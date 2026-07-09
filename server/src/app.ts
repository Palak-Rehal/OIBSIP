import express from "express";
import pizzaRoutes from "./routes/pizza.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();

app.use(express.json());

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send("PizzaHub API Running...");
});

export default app;