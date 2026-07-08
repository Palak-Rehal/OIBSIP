import mongoose, { Schema, Document } from "mongoose";

export interface IPizza extends Document {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  sizes: string[];
  ingredients: string[];
  isVeg: boolean;
  isAvailable: boolean;
  rating: number;
  totalReviews: number;
}

const PizzaSchema = new Schema<IPizza>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    sizes: [
      {
        type: String,
      },
    ],

    ingredients: [
      {
        type: String,
      },
    ],

    isVeg: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model<IPizza>("Pizza", PizzaSchema);

export default Pizza;