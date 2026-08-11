import mongoose, { Document } from "mongoose";


export interface ICart extends Document {

  user: mongoose.Types.ObjectId;

  pizza?: mongoose.Types.ObjectId | null;

  name?: string;

  size: string;

  crust?: string;

  sauce?: string;

  cheese?: string;

  toppings?: string[];

  quantity: number;

  price: number;

  isCustomized: boolean;

}



const cartSchema = new mongoose.Schema<ICart>(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: false,
      default: null,
    },


    name: {
      type: String,
      required: false,
    },


    size: {
      type: String,
      required: true,
    },


    crust: {
      type: String,
      required: false,
    },

    sauce: {
      type: String,
      required: false,
    },

    cheese: {
      type: String,
      required: false,
    },

    

    toppings: {
      type: [String],
      default: [],
    },


    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },


    price: {
      type: Number,
      required: true,
    },


    isCustomized: {
      type: Boolean,
      default: false,
    },


  },
  {
    timestamps: true,
  }
);



export default mongoose.model<ICart>(
  "Cart",
  cartSchema
);