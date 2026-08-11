import cron from "node-cron";
import { checkLowStock } from "../controllers/inventory.controller";
import { sendLowStockEmail } from "../utils/sendLowStockEmail";

export const startLowStockCron = () => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("Checking inventory...");

    const items = await checkLowStock();

   if (items.length) {

  console.log("Low Stock Items:");

  items.forEach((item) => {
    console.log(
      `${item.name} : ${item.stock} remaining`
    );
  });

  await sendLowStockEmail(items);

  console.log("Low stock email sent successfully.");

}
  });
};