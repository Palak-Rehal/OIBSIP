import mongoose, { Document } from "mongoose";

interface IPizza extends Document {
  name: string;
  description: string;
  category:
    | "Veg"
    | "Non-Veg"
    | "Cheese Burst"
    | "Dessert"
    | "Beverages"
    | "Sides"
    | "Combos";

  image: string;

  rating: number;
  totalReviews: number;
  isFeatured: boolean;
  isAvailable: boolean;

  ingredients: string[];

  sizes: {
    size: "Small" | "Medium" | "Large";
    price: number;
  }[];

  createdBy?: mongoose.Types.ObjectId;
}

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,

      enum: [
        "Veg",
        "Non-Veg",
        "Cheese Burst",
        "Dessert",
        "Beverages",
        "Sides",
        "Combos",
      ],
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    sizes: [
      {
        size: {
          type: String,
          enum: ["Small", "Medium", "Large"],
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Pizza", pizzaSchema);