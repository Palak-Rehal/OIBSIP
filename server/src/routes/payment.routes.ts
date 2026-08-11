import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controller";

import  protect from "../middleware/auth.middleware";


const router = express.Router();


router.post(
  "/create-order",
  protect,
  createPaymentOrder
);


router.post(
  "/verify-payment",
  protect,
  verifyPayment
);


export default router;