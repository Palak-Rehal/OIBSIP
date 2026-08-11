import API from "./axios";

// ==============================
// Get All Coupons (Admin)
// ==============================

export const getCoupons = () => {
  return API.get("/coupons");
};

// ==============================
// Create Coupon (Admin)
// ==============================

export const createCoupon = (data: {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minimumOrder: number;
  maxDiscount: number;
  expiryDate: string;
  usageLimit: number;
}) => {
  return API.post("/coupons", data);
};

// ==============================
// Update Coupon (Admin)
// ==============================

export const updateCoupon = (
  id: string,
  data: {
    code?: string;
    discountType?: "percentage" | "flat";
    discountValue?: number;
    minimumOrder?: number;
    maxDiscount?: number;
    expiryDate?: string;
    usageLimit?: number;
    isActive?: boolean;
  }
) => {
  return API.put(`/coupons/${id}`, data);
};

// ==============================
// Delete Coupon (Admin)
// ==============================

export const deleteCoupon = (id: string) => {
  return API.delete(`/coupons/${id}`);
};

// ==============================
// Enable / Disable Coupon (Admin)
// ==============================

export const toggleCouponStatus = (id: string) => {
  return API.patch(`/coupons/toggle/${id}`);
};

// ==============================
// Validate Coupon (User Checkout)
// ==============================

export const validateCoupon = (
  code: string,
  totalAmount: number
) => {
  return API.post("/coupons/validate", {
    code,
    totalAmount,
  });
};