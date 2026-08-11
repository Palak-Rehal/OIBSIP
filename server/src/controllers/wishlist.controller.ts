import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Wishlist from "../models/Wishlist";

// ===============================
// Get My Wishlist
// ===============================

export const getWishlist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    let wishlist = await Wishlist.findOne({ user: userId }).populate(
      "pizzas"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, pizzas: [] });
    }

    return res.status(200).json({
      success: true,
      pizzas: wishlist.pizzas,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Add Pizza To Wishlist
// ===============================

export const addToWishlist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { pizzaId } = req.params;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, pizzas: [] });
    }

    const alreadySaved = wishlist.pizzas.some(
      (id) => id.toString() === pizzaId
    );

    if (!alreadySaved) {
      wishlist.pizzas.push(pizzaId as any);
      await wishlist.save();
    }

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Remove Pizza From Wishlist
// ===============================

export const removeFromWishlist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { pizzaId } = req.params;

    await Wishlist.updateOne(
      { user: userId },
      { $pull: { pizzas: pizzaId } }
    );

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};