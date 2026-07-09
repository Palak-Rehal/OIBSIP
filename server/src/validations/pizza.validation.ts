import { body } from "express-validator";

export const pizzaValidation = [
  body("name")
    .notEmpty()
    .withMessage("Pizza name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("image")
    .notEmpty()
    .withMessage("Image is required"),
];