import { Request, Response } from "express";
import crypto from "crypto";

import razorpay from "../config/razorpay";

import Order from "../models/Order";
import Cart from "../models/Cart";

// Create Razorpay Order

export const createPaymentOrder = async (
  req: Request,
  res: Response
) => {

  try {

    const { orderId } = req.body;


    const order = await Order.findById(orderId);


    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }


    const paymentOrder =
      await razorpay.orders.create({

        amount:
          Math.round(order.totalAmount * 100),

        currency: "INR",

        receipt:
          order._id.toString(),

      });


    await Order.findByIdAndUpdate(
      orderId,
      {
        razorpayOrderId: paymentOrder.id
      }
    );


    res.json({
      success: true,
      paymentOrder
    });


  } catch (error: any) {

    console.error(
      "RAZORPAY CREATE ORDER ERROR:",
      error?.response?.data || error?.message || error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.error?.description ||
        error?.message ||
        "Payment order creation failed",
    });
  }

};




// ================================
// VERIFY RAZORPAY PAYMENT
// ================================

export const verifyPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // ----------------------------
    // Validate request
    // ----------------------------

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    // ----------------------------
    // Find order
    // ----------------------------

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ----------------------------
    // Generate signature
    // ----------------------------

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error(
        "RAZORPAY_KEY_SECRET is missing"
      );

      return res.status(500).json({
        success: false,
        message: "Razorpay secret is not configured",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    // ----------------------------
    // Verify signature
    // ----------------------------

    if (
      expectedSignature !== razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ----------------------------
    // Update order
    // ----------------------------

    order.paymentStatus = "Paid";
    order.orderStatus = "Placed";
    order.razorpayOrderId =
      razorpay_order_id;
    order.razorpayPaymentId =
      razorpay_payment_id;
    order.razorpaySignature =
      razorpay_signature;

    await order.save();

    // ----------------------------
    // NOW clear cart
    // ----------------------------

    await Cart.deleteMany({
      user: order.user,
    });

    // ----------------------------
    // Response
    // ----------------------------

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });

  } catch (error) {
    console.error(
      "VERIFY PAYMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Verification failed",
    });
  }
};
