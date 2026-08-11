import { Request, Response } from "express";
import Coupon from "../models/Coupon";

// ==============================
// Create Coupon
// ==============================

export const createCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumOrder,
      maxDiscount,
      expiryDate,
      usageLimit,
    } = req.body;

    const existingCoupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (existingCoupon) {
      res.status(400).json({
        success: false,
        message: "Coupon already exists",
      });
      return;
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minimumOrder,
      maxDiscount,
      expiryDate,
      usageLimit,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create coupon",
    });
  }
};

// ==============================
// Get All Coupons
// ==============================

export const getCoupons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
    });
  }
};
// ==============================
// Validate Coupon
// ==============================

export const validateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code, totalAmount } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Invalid coupon",
      });
      return;
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
      return;
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      res.status(400).json({
        success: false,
        message: "Coupon usage limit reached",
      });
      return;
    }

    if (totalAmount < coupon.minimumOrder) {
      res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minimumOrder}`,
      });
      return;
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (totalAmount * coupon.discountValue) / 100;

      if (
        coupon.maxDiscount &&
        discount > coupon.maxDiscount
      ) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      discount,
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Coupon validation failed",
    });
  }
};

// ==============================
// Update Coupon
// ==============================

export const updateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update coupon",
    });
  }
};

// ==============================
// Delete Coupon
// ==============================

export const deleteCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
      return;
    }

    await coupon.deleteOne();

    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete coupon",
    });
  }
};

// ==============================
// Toggle Active / Inactive
// ==============================

export const toggleCouponStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
      return;
    }

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    res.json({
      success: true,
      message: "Coupon status updated",
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update coupon status",
    });
  }
};