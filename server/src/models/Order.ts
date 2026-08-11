import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;

  items: {
    pizza?: {
      _id: mongoose.Types.ObjectId;
      name: string;
      image?: string;
    } | mongoose.Types.ObjectId | null;

    name?: string;

    quantity: number;

    size: string;

    crust?: string;

    sauce?: string;

    cheese?: string;

    toppings?: string[];

    price: number;

    isCustomized?: boolean;
  }[];

  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  totalAmount: number;

  paymentMethod: string;

  paymentStatus: string;

  razorpayOrderId: string;

  razorpayPaymentId: string;

  razorpaySignature: string;

  orderStatus: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {

        pizza: {
          type: Schema.Types.ObjectId,
          ref: "Pizza",
          required: false,
          default: null,
        },


        name: {
          type: String,
          default: "",
        },


        quantity: {
          type: Number,
          required: true,
        },


        size: {
          type: String,
          required: true,
        },


        crust: {
          type: String,
          default: "",
        },

        sauce: {
          type: String,
          default: "",
        },

        cheese: {
          type: String,
          default: "",
        },


        toppings: {
          type: [String],
          default: [],
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
    ],

    deliveryAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Preparing",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);