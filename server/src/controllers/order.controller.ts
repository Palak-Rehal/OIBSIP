import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Cart from "../models/Cart";
import Order from "../models/Order";

export const placeOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const cartItems = await Cart.find({
      user: userId,
    }).populate("pizza");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    let totalAmount = 0;

    cartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    const order = await Order.create({
      user: userId,

      items: cartItems.map((item) => ({
        pizza: item.pizza,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      })),

      totalAmount,

      paymentMethod: "COD",

      paymentStatus: "Pending",

      orderStatus: "Placed",
    });

    await Cart.deleteMany({
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getMyOrders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const orders = await Order.find({
      user: userId,
    })
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getOrderById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate("items.pizza");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const cancelOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if order can be cancelled
    if (
      order.orderStatus === "Out For Delivery" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAllOrders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = [
      "Placed",
      "Preparing",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    // Automatically mark payment as paid when delivered
    if (
      order.paymentMethod === "COD" &&
      orderStatus === "Delivered"
    ) {
      order.paymentStatus = "Paid";
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
