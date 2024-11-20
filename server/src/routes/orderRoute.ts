import express from "express";
const orderRouter = express.Router();
import { createOrder, getAllOrders } from "../controllers/orderController";
import { validateUserRole } from "../middlewares/validateUserRole";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";

orderRouter.post("/create-order", authenticateAndRefreshToken, createOrder);
orderRouter.get(
  "/get-all-orders",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getAllOrders
);

export default orderRouter;
