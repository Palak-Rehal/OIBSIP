import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  pizza: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema(
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

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews from the same user
reviewSchema.index({ user: 1, pizza: 1 }, { unique: true });

export default mongoose.model<IReview>("Review", reviewSchema);