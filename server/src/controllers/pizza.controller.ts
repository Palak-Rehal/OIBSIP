import { Request, Response } from "express";

export const getAllPizzas = async (req: Request, res: Response) => {
  res.json({ message: "Get all pizzas" });
};

export const getPizzaById = async (req: Request, res: Response) => {
  res.json({ message: "Get pizza by id" });
};

export const createPizza = async (req: Request, res: Response) => {
  res.json({ message: "Create pizza" });
};

export const updatePizza = async (req: Request, res: Response) => {
  res.json({ message: "Update pizza" });
};

export const deletePizza = async (req: Request, res: Response) => {
  res.json({ message: "Delete pizza" });
};