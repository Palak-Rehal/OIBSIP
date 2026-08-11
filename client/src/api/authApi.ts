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
  address?: string;
}) => API.put("/auth/profile", data);

// Forgot Password
export const forgotPassword = (email: string) =>
  API.post("/auth/forgot-password", { email });

// Reset Password
export const resetPassword = (
  token: string,
  password: string
) =>
  API.put(`/auth/reset-password/${token}`, {
    password,
  });