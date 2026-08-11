import mongoose, { Document, Schema } from "mongoose";

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  pizzas: mongoose.Types.ObjectId[];
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    pizzas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pizza",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);