import API from "./axios";

export const loginUser = (data: {
  email: string;
  password: string;
}) => API.post("/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => API.post("/auth/register", data);

export const getProfile = () =>
  API.get("/auth/profile");

export const updateProfile = (data: {
  name?: string;
  phone?: string;
}) => API.put("/auth/profile", data);