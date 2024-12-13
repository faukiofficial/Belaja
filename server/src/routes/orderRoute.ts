import express from "express";
const orderRouter = express.Router();
import { createOrder, getAllOrders, newPayment, getPaymentStatus } from "../controllers/orderController";
import { validateUserRole } from "../middlewares/validateUserRole";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";

orderRouter.post("/create-order", authenticateAndRefreshToken, createOrder);
orderRouter.get(
  "/get-all-orders",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getAllOrders
);
// orderRouter.get("/payment/stripe-publishable-key", sendStripePublishableKey);
orderRouter.post("/payment", authenticateAndRefreshToken, newPayment);
orderRouter.get(
  "/payment/status/:orderId",
  authenticateAndRefreshToken,
  getPaymentStatus
);


export default orderRouter;
