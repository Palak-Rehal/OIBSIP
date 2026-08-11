import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Pizza from "../models/Pizza";

// ===============================
// Create Pizza
// ===============================

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

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get All Pizzas
// ===============================

export const getAllPizzas = async (
  req: Request,
  res: Response
) => {
  try {
    const search = String(req.query.search || "").trim();
    const category = String(req.query.category || "").trim();
    const sort = String(req.query.sort || "latest");
    const featured = String(req.query.featured || "");

    const minPrice =
      req.query.minPrice !== undefined
        ? Number(req.query.minPrice)
        : undefined;

    const maxPrice =
      req.query.maxPrice !== undefined
        ? Number(req.query.maxPrice)
        : undefined;

    const page = Math.max(
      1,
      Number(req.query.page) || 1
    );

    const limit = Math.max(
      1,
      Number(req.query.limit) || 100
    );

    const skip = (page - 1) * limit;

    // ===============================
    // QUERY
    // ===============================

    const query: any = {
      isAvailable: true,

      // Menu contains ONLY pizzas
      category: {
        $in: ["Veg", "Non-Veg", "Cheese Burst"],
      },
    };

    // ===============================
    // SEARCH
    // ===============================

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          ingredients: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Featured
    if (featured === "true") {
      query.isFeatured = true;
    }

    // ===============================
    // PRICE
    // ===============================

    if (
      minPrice !== undefined ||
      maxPrice !== undefined
    ) {
      const priceFilter: any = {};

      if (
        minPrice !== undefined &&
        !isNaN(minPrice)
      ) {
        priceFilter.$gte = minPrice;
      }

      if (
        maxPrice !== undefined &&
        !isNaN(maxPrice)
      ) {
        priceFilter.$lte = maxPrice;
      }

      query.sizes = {
        $elemMatch: {
          price: priceFilter,
        },
      };
    }

    // ===============================
    // SORT
    // ===============================

    let sortOption: any = {
      createdAt: -1,
    };

    switch (sort) {
      case "price_asc":
        sortOption = {
          "sizes.0.price": 1,
        };
        break;

      case "price_desc":
        sortOption = {
          "sizes.0.price": -1,
        };
        break;

      case "rating":
        sortOption = {
          rating: -1,
        };
        break;

      case "latest":
      default:
        sortOption = {
          createdAt: -1,
        };
        break;
    }

    // ===============================
    // DATABASE
    // ===============================

    const totalPizzas =
      await Pizza.countDocuments(query);

    const pizzas = await Pizza.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages:
        Math.ceil(totalPizzas / limit) || 1,
      totalPizzas,
      count: pizzas.length,
      pizzas,
    });

  } catch (error) {

    console.error(
      "GET ALL PIZZAS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get Pizza By ID
// ===============================

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

// ===============================
// Update Pizza
// ===============================

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

// ===============================
// Delete Pizza
// ===============================

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