import mongoose, { Schema, Document } from "mongoose";

export interface ICustomPizza extends Document {
  user: mongoose.Types.ObjectId;
  base: string;
  sauce: string;
  cheese: string;
  vegetables: string[];
  meats: string[];
  extras: string[];
  price: number;
}

const CustomPizzaSchema = new Schema<ICustomPizza>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    base: {
      type: String,
      required: true,
    },

    sauce: {
      type: String,
      required: true,
    },

    cheese: {
      type: String,
      required: true,
    },

    vegetables: [
      {
        type: String,
      },
    ],

    meats: [
      {
        type: String,
      },
    ],

    extras: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CustomPizza = mongoose.model<ICustomPizza>(
  "CustomPizza",
  CustomPizzaSchema
);

export default CustomPizza;