import API from "./axios";


export const addToCart = (data: {
  pizzaId?: string | null;
  quantity: number;
  size: string;
  name?: string;
  crust?: string;
  sauce?: string;
  cheese?: string;
  toppings?: string[];
  price?: number;
  isCustomized?: boolean;
}) =>
  API.post("/cart/add", data);



export const getCart = () =>
  API.get("/cart");



export const updateCart = (
  id: string,
  quantity: number
) =>
  API.put(`/cart/update/${id}`, {
    quantity,
  });



export const removeCartItem = (id: string) =>
  API.delete(`/cart/remove/${id}`);



export const clearCart = () =>
  API.delete("/cart/clear");