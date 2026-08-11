import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  category: string;
  name: string;
  stock: number;
  threshold: number;
}

const inventorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    threshold: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInventory>(
  "Inventory",
  inventorySchema
);