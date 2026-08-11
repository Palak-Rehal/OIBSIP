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

  cartItemId?: string;
}

// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = (data: CreateOrderData) => {
  return API.post("/orders", data);
};

// ==========================================
// GET MY ORDERS
// ==========================================

export const getMyOrders = () => {
  return API.get("/orders");
};

// ==========================================
// GET ORDER BY ID
// ==========================================

export const getOrderById = (id: string) => {
  return API.get(`/orders/${id}`);
};

// ==========================================
// CANCEL ORDER
// ==========================================

export const cancelOrder = (id: string) => {
  return API.put(`/orders/cancel/${id}`);
};