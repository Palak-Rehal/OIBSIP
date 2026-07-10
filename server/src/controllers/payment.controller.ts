import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import razorpay from "../config/razorpay";
import Order from "../models/Order";
import crypto from "crypto";

export const createPaymentOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: order.totalAmount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: order._id.toString(),
    };

   const paymentOrder = await razorpay.orders.create(options);

// Save Razorpay Order ID
    order.razorpayOrderId = paymentOrder.id;

    await order.save();

    return res.status(200).json({
      success: true,
     paymentOrder,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Payment order creation failed",
    });
  }
};
export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "Paid";
    order.paymentMethod = "Razorpay";

    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

      await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};