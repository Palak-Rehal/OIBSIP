import dotenv from "dotenv";
import Razorpay from "razorpay";

// Load environment variables BEFORE creating Razorpay instance
dotenv.config();

if (!process.env.RAZORPAY_KEY_ID) {
  console.error("❌ RAZORPAY_KEY_ID is missing");
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ RAZORPAY_KEY_SECRET is missing");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export default razorpay;