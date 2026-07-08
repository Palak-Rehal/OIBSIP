import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  pizza: mongoose.Types.ObjectId;
  quantity: number;
  size: string;
  price: number;
}

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pizza: {
      type: Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    size: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;