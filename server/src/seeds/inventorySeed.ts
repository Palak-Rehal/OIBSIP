import mongoose from "mongoose";
import dotenv from "dotenv";
import Inventory from "../models/Inventory";
 
dotenv.config();
 
const inventoryItems = [
  // Bases / Crusts (5 options — must match CrustSelector.tsx names)
  { category: "Base", name: "Classic", stock: 100, threshold: 20 },
  { category: "Base", name: "Cheese Burst", stock: 100, threshold: 20 },
  { category: "Base", name: "Thin Crust", stock: 100, threshold: 20 },
  { category: "Base", name: "Whole Wheat", stock: 100, threshold: 20 },
  { category: "Base", name: "Multigrain", stock: 100, threshold: 20 },
 
  // Sauces (5 options — must match SauceSelector.tsx names)
  { category: "Sauce", name: "Pizza Sauce", stock: 100, threshold: 20 },
  { category: "Sauce", name: "Spicy Tomato", stock: 100, threshold: 20 },
  { category: "Sauce", name: "BBQ Sauce", stock: 100, threshold: 20 },
  { category: "Sauce", name: "Garlic Sauce", stock: 100, threshold: 20 },
  { category: "Sauce", name: "Pesto Sauce", stock: 100, threshold: 20 },
 
  // Cheeses (must match CheeseSelector.tsx names)
  { category: "Cheese", name: "Regular Cheese", stock: 100, threshold: 20 },
  { category: "Cheese", name: "Extra Cheese", stock: 100, threshold: 20 },
  { category: "Cheese", name: "Double Cheese", stock: 100, threshold: 20 },
 
  // Vegetables / Toppings (must match ToppingsSelector.tsx names)
  { category: "Topping", name: "Extra Cheese", stock: 100, threshold: 20 },
  { category: "Topping", name: "Paneer", stock: 100, threshold: 20 },
  { category: "Topping", name: "Corn", stock: 100, threshold: 20 },
  { category: "Topping", name: "Olives", stock: 100, threshold: 20 },
  { category: "Topping", name: "Mushroom", stock: 100, threshold: 20 },
  { category: "Topping", name: "Jalapeno", stock: 100, threshold: 20 },
 
  // Standard-menu-pizza ingredients (from pizzaSeed.ts) so non-customized
  // orders also decrement stock — see order.controller.ts
  { category: "Ingredient", name: "Mozzarella", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Tomato", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Basil", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Capsicum", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Onion", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Corn", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Cheese", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Pepperoni", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Chicken", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "BBQ Sauce", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Extra Cheese", stock: 150, threshold: 30 },
  { category: "Ingredient", name: "Chocolate", stock: 150, threshold: 30 },
];
 
const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
 
    await Inventory.deleteMany();
 
    await Inventory.insertMany(inventoryItems);
 
    console.log("Inventory Seeded Successfully");
 
    process.exit();
  } catch (error) {
    console.log(error);
 
    process.exit(1);
  }
};
 
importData();
 
