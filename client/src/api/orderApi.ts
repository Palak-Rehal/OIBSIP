import API from "./axios";

export interface CreateOrderData {
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  paymentMethod: string;
}

export const createOrder = (
  data: CreateOrderData
) =>
  API.post("/orders", data);

export const getMyOrders = () =>
  API.get("/orders/my-orders");

export const getOrderById = (
  id: string
) =>
  API.get(`/orders/${id}`);

export const cancelOrder = (
  id: string
) =>
  API.put(`/orders/${id}/cancel`);