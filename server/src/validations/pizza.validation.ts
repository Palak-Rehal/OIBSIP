import { body } from "express-validator";

export const pizzaValidation = [
  body("name")
    .notEmpty()
    .withMessage("Pizza name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("image")
    .notEmpty()
    .withMessage("Image is required"),

  body("sizes")
    .isArray({ min: 1 })
    .withMessage("At least one size is required"),

  body("sizes.*.price")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),
];