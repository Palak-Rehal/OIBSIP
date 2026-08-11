import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Inventory from "../models/Inventory";


export const placeOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const {
      deliveryAddress,
      paymentMethod = "COD",
      cartItemId,
    } = req.body;

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }
    // =========================
    // GET CART
    // =========================

    let cartQuery: any = {
      user: userId,
    };

    if (cartItemId) {
      cartQuery._id = cartItemId;
    }

    const cartItems = await Cart.find(cartQuery)
      .populate("pizza")
      .lean();
    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // =========================
    // CALCULATE TOTAL
    // =========================

    let totalAmount = 0;

    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }

    // =========================
    // CHECK INVENTORY FIRST
    // =========================

    for (const item of cartItems as any[]) {
      const quantity = item.quantity || 1;

      // ==========================================
      // NORMAL MENU PIZZA
      // ==========================================

      if (!item.isCustomized) {
        const pizzaDoc = item.pizza as any;

        if (!pizzaDoc) {
          return res.status(400).json({
            success: false,
            message: "Pizza information not found",
          });
        }

        const ingredients: string[] =
          pizzaDoc.ingredients || [];

        for (const ingredientName of ingredients) {
          const stockItem = await Inventory.findOne({
            category: "Ingredient",
            name: ingredientName,
          });

          // If inventory is not tracking this ingredient,
          // don't block the order.
          if (!stockItem) {
            continue;
          }

          if (stockItem.stock < quantity) {
            return res.status(400).json({
              success: false,
              message: `${ingredientName} is out of stock`,
            });
          }
        }

        continue;
      }

      // ==========================================
      // CUSTOMIZED PIZZA
      // ==========================================

      // -------- BASE --------

      if (item.crust) {
        const base = await Inventory.findOne({
          category: "Base",
          name: {
            $regex: new RegExp(`^${item.crust}$`, "i"),
          },
        });

        if (base && base.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `${item.crust} base is out of stock`,
          });
        }
      }

      // -------- CHEESE --------

      if (item.cheese) {
        const cheese = await Inventory.findOne({
          category: "Cheese",
          name: item.cheese,
        });

        if (cheese && cheese.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `${item.cheese} is out of stock`,
          });
        }
      }

      // -------- SAUCE --------

      if (item.sauce) {
        const sauce = await Inventory.findOne({
          category: "Sauce",
          name: item.sauce,
        });

        if (sauce && sauce.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `${item.sauce} is out of stock`,
          });
        }
      }

      // -------- TOPPINGS --------

      if (item.toppings?.length) {
        for (const topping of item.toppings) {
          const toppingItem = await Inventory.findOne({
            category: "Topping",
            name: topping,
          });

          if (
            toppingItem &&
            toppingItem.stock < quantity
          ) {
            return res.status(400).json({
              success: false,
              message: `${topping} is out of stock`,
            });
          }
        }
      }
    }

    // =========================
    // CREATE ORDER
    // =========================

    const order = await Order.create({
      user: userId,

      items: cartItems.map((item: any) => ({
        pizza: item.isCustomized
          ? null
          : item.pizza?._id || item.pizza || null,

        name: item.isCustomized
          ? item.name || "Customized Pizza"
          : item.pizza?.name || "Pizza",

        quantity: item.quantity,
        size: item.size,

        crust: item.crust || "",
        sauce: item.sauce || "",
        cheese: item.cheese || "",
        toppings: item.toppings || [],

        price: item.price,

        isCustomized: item.isCustomized || false,
      })),
      deliveryAddress,

      totalAmount,

      paymentMethod,

      paymentStatus: "Pending",

      orderStatus: "Placed",
    });

    // =========================
    // DECREASE INVENTORY
    // =========================

    for (const item of cartItems as any[]) {
      const quantity = item.quantity || 1;

      // ==========================================
      // NORMAL PIZZA
      // ==========================================

      if (!item.isCustomized) {
        const pizzaDoc = item.pizza as any;

        const ingredients: string[] =
          pizzaDoc?.ingredients || [];

        for (const ingredientName of ingredients) {
          const stockItem = await Inventory.findOne({
            category: "Ingredient",
            name: ingredientName,
          });

          if (!stockItem) {
            continue;
          }

          stockItem.stock -= quantity;

          await stockItem.save();
        }

        continue;
      }

      // ==========================================
      // CUSTOM PIZZA
      // ==========================================

      // -------- BASE --------


      if (item.crust) {
        const base = await Inventory.findOne({
          category: "Base",
          name: {
            $regex: new RegExp(`^${item.crust}$`, "i"),
          },
        });

        if (base) {
          base.stock -= quantity;
          await base.save();
        }
      }

      // -------- CHEESE --------

      if (item.cheese) {
        const cheese = await Inventory.findOne({
          category: "Cheese",
          name: item.cheese,
        });

        if (cheese) {
          cheese.stock -= quantity;
          await cheese.save();
        }
      }

      // -------- SAUCE --------

      if (item.sauce) {
        const sauce = await Inventory.findOne({
          category: "Sauce",
          name: item.sauce,
        });

        if (sauce) {
          sauce.stock -= quantity;
          await sauce.save();
        }
      }

      // -------- TOPPINGS --------

      if (item.toppings?.length) {
        for (const topping of item.toppings) {
          const toppingItem = await Inventory.findOne({
            category: "Topping",
            name: topping,
          });

          if (toppingItem) {
            toppingItem.stock -= quantity;
            await toppingItem.save();
          }
        }
      }
    }

    // =========================
    // CLEAR CART
    // =========================

    if (paymentMethod === "COD") {
      await Cart.deleteMany({
        _id: {
          $in: cartItems.map((item) => item._id),
        },
        user: userId,
      });
    }

    // =========================
    // RESPONSE
    // =========================

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error: any) {
    console.error("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Server Error",
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

