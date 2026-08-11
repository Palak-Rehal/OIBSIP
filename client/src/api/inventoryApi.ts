import axios from "./axios";


// Get all inventory items

export const getInventory = () => {
  return axios.get("/inventory");
};


// Update inventory item

export const updateInventory = (
  id: string,
  data: {
    stock: number;
    threshold: number;
  }
) => {
  return axios.put(`/inventory/${id}`, data);
};