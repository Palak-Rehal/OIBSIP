import { Request, Response } from "express";
import Review from "../models/Review";
import Pizza from "../models/Pizza";
import { AuthRequest } from "../middleware/auth.middleware";

// ===============================
// Add Review
// ===============================
export const addReview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { pizzaId, rating, comment } = req.body;

    // Check Pizza
    const pizza = await Pizza.findById(pizzaId);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      user: req.user?.id,
      pizza: pizzaId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this pizza.",
      });
    }

    // Create Review
    const review = await Review.create({
      user: req.user?.id,
      pizza: pizzaId,
      rating,
      comment,
    });

    // Calculate Average Rating
    const reviews = await Review.find({
      pizza: pizzaId,
    });

    const totalReviews = reviews.length;

    const averageRating =
      reviews.reduce(
        (sum, item) => sum + item.rating,
        0
      ) / totalReviews;

    pizza.rating = Number(averageRating.toFixed(1));
    pizza.totalReviews = totalReviews;

    await pizza.save();

    return res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      review,
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
// Get Reviews of Pizza
// ===============================
export const getPizzaReviews = async (
  req: Request,
  res: Response
) => {
  try {

    const { pizzaId } = req.params;

    const reviews = await Review.find({
      pizza: pizzaId,
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Update Review
// ===============================
export const updateReview = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const { id } = req.params;

    const { rating, comment } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    // Update Pizza Rating
    const reviews = await Review.find({
      pizza: review.pizza,
    });

    const totalReviews = reviews.length;

    const averageRating =
      reviews.reduce(
        (sum, item) => sum + item.rating,
        0
      ) / totalReviews;

    await Pizza.findByIdAndUpdate(review.pizza, {
      rating: Number(averageRating.toFixed(1)),
      totalReviews,
    });

    return res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      review,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Delete Review
// ===============================
export const deleteReview = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const pizzaId = review.pizza;

    await review.deleteOne();

    // Update Pizza Rating
    const reviews = await Review.find({
      pizza: pizzaId,
    });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? reviews.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / totalReviews
        : 0;

    await Pizza.findByIdAndUpdate(pizzaId, {
      rating: Number(averageRating.toFixed(1)),
      totalReviews,
    });

    return res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ===============================
// Get All Reviews - Admin
// ===============================
export const getAllReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email profileImage")
      .populate("pizza", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get all reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};