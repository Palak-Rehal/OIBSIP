import API from "./axios";

export const getWishlist = () => API.get("/wishlist");

export const addToWishlist = (pizzaId: string) =>
  API.post(`/wishlist/${pizzaId}`);

export const removeFromWishlist = (pizzaId: string) =>
  API.delete(`/wishlist/${pizzaId}`);