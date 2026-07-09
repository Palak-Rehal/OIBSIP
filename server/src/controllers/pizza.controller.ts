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

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
export const getAllPizzas = async (
  req: Request,
  res: Response
) => {
  try {

    const pizzas = await Pizza.find();

    return res.status(200).json({
      success: true,
      count: pizzas.length,
      pizzas,
    });

  } catch (error) {

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