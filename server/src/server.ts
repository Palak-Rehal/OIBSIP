import dotenv from "dotenv";
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

import app from "./app";
import connectDB from "./config/db";
import paymentRoutes from "./routes/payment.routes";
import adminRoutes from "./routes/adminRoutes";
import inventoryRoutes from "./routes/inventory.routes";
import { startLowStockCron } from "./jobs/lowStockCron";

app.use(
  "/api/payment",
  paymentRoutes
);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);



const PORT = process.env.PORT || 5000;

connectDB();

startLowStockCron();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});