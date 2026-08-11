import { Request, Response } from "express";
import Cart from "../models/Cart";
import Pizza from "../models/Pizza";
import { AuthRequest } from "../middleware/auth.middleware";
export const addToCart = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      pizzaId,
      quantity,
      size,
      name,
      crust,
      sauce,
      cheese,
      toppings,
      price,
      isCustomized,
      customName,
    } = req.body;


    const userId = req.user!.id;


    // ==========================
    // CUSTOMIZED PIZZA
    // ==========================

    if (isCustomized) {


      const cartItem = await Cart.create({
        user: userId,
        pizza: null,
        name: customName || "Custom Pizza",
        size,
        crust,
        sauce,
        cheese,
        toppings,
        quantity: quantity || 1,
        price,
        isCustomized: true,
      });


      return res.status(201).json({

        success: true,

        message: "Customized pizza added to cart",

        cartItem,

      });

    }



    // ==========================
    // NORMAL PIZZA
    // ==========================


    const pizza = await Pizza.findById(pizzaId);


    if (!pizza) {

      return res.status(404).json({

        success: false,

        message: "Pizza not found",

      });

    }



    const selectedSize = pizza.sizes.find(
      (item) => item.size === size
    );


    if (!selectedSize) {

      return res.status(400).json({

        success: false,

        message: "Invalid pizza size",

      });

    }



    let cartItem = await Cart.findOne({

      user: userId,

      pizza: pizzaId,

      size,

      isCustomized: false,

    });



    if (cartItem) {

      cartItem.quantity += quantity || 1;

      await cartItem.save();


    } else {


      cartItem = await Cart.create({

        user: userId,

        pizza: pizzaId,

        quantity: quantity || 1,

        size,

        price: selectedSize.price,

        isCustomized: false,

      });

    }



    return res.status(201).json({

      success: true,

      message: "Pizza added to cart",

      cartItem,

    });



  } catch (error) {

    console.error(error);


    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const getCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const cartItems = await Cart.find({ user: userId })
      .populate("pizza");

    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return res.status(200).json({
      success: true,
      totalItems: cartItems.length,
      totalPrice,
      cartItems,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: id,
      user: userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const removeCartItem = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const cartItem = await Cart.findOne({
      _id: id,
      user: userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const clearCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    await Cart.deleteMany({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};