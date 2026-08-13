import api from "./axios";


// ================= DASHBOARD =================

export const getDashboard = () => {
  return api.get("/admin/dashboard");
};



// ================= ORDERS =================

// Get all orders for admin
export const getAllOrders = () => {
  return api.get("/orders/admin/all");
};


// Update order status
export const updateOrderStatus = (
  id: string,
  orderStatus: string
) => {
  return api.put(
    `/orders/admin/update/${id}`,
    {
      orderStatus,
    }
  );
};

// ================= USERS =================

// Get all users for admin
export const getAllUsers = () => {
  return api.get("/admin/users");
};


// ================= COUPONS =================

export const getAllCoupons = () => {
  return api.get("/coupons");
};


export const createCoupon = (data: any) => {
  return api.post("/coupons", data);
};


export const deleteCoupon = (id: string) => {
  return api.delete(`/coupons/${id}`);
};
// ================= INVENTORY =================

export const getInventory = () => {
  return api.get("/inventory");
};


export const updateInventory = (
  id: string,
  stock: number
) => {
  return api.put(
    `/inventory/${id}`,
    {
      stock,
    }
  );
};
export const getAllReviews = () =>
  api.get("/reviews/admin/all");