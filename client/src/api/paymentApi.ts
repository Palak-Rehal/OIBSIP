import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";


// Create Razorpay Order

export const createPaymentOrder = async (
  orderId: string
) => {
  return await axios.post(
    `${API_URL}/create-order`,
    {
      orderId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};


// Verify Razorpay Payment

export const verifyPayment = async (
  data: {
    orderId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) => {
  return await axios.post(
    `${API_URL}/verify-payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};
import API from "./axios";

export const getFeaturedPizzas = () => {
  return API.get("/pizzas", {
    params: {
      featured: true,
      page: 1,
      limit: 20,
    },
  });
};