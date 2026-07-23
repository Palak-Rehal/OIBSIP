import API from "./axios";

export const addToCart = (data: {
  pizzaId: string;
  quantity: number;
  size: string;
}) => API.post("/cart", data);

export const getCart = () =>
  API.get("/cart");

export const updateCart = (
  id: string,
  quantity: number
) =>
  API.put(`/cart/${id}`, {
    quantity,
  });

export const removeCartItem = (id: string) =>
  API.delete(`/cart/${id}`);

export const clearCart = () =>
  API.delete("/cart");