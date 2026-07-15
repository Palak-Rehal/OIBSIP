import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Pizza from "../models/Pizza";

export const createPizza = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const pizza = await Pizza.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Pizza Added Successfully",
      pizza,
    });

  } catch (error: any) {
    console.error("Create Pizza Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
export const getAllPizzas = async (
  req: Request,
  res: Response
) => {
  try {
    // Query Parameters
    const search = req.query.search as string;
    const category = req.query.category as string;
    const sort = req.query.sort as string;
    const featured = req.query.featured;

    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);

    const page = Math.max(1, Number(req.query.page) || 1);
const limit = Math.max(1, Number(req.query.limit) || 10);

    const skip = (page - 1) * limit;

    // Filter Object
    let query: any = {};

    // Search by Pizza Name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    if (featured === "true") {
  query.isFeatured = true;
  }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = minPrice;
      }

      if (maxPrice) {
        query.price.$lte = maxPrice;
      }
    }

    // Sorting
    let sortOption: any = {};

    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;

      case "price_desc":
        sortOption.price = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      case "latest":
        sortOption.createdAt = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    // Total Documents
    const totalPizzas = await Pizza.countDocuments(query);

    // Fetch Data
    const pizzas = await Pizza.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalPizzas / limit),
      totalPizzas,
      count: pizzas.length,
      pizzas,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getPizzaById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const pizza = await Pizza.findById(id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    return res.status(200).json({
      success: true,
      pizza,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updatePizza = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const pizza = await Pizza.findById(id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    const updatedPizza = await Pizza.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Pizza Updated Successfully",
      pizza: updatedPizza,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deletePizza = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const pizza = await Pizza.findById(id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    await Pizza.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Pizza Deleted Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
