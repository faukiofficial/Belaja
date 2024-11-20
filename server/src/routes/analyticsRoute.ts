const analyticsRoute = require("express").Router();
import {
  getUsersAnalytics,
  getCoursesAnalytics,
  getOrdersAnalytics,
} from "../controllers/analyticsController";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";
import { validateUserRole } from "../middlewares/validateUserRole";

analyticsRoute.get(
  "/get-users-analytics",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getUsersAnalytics
);
analyticsRoute.get(
  "/get-courses-analytics",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getCoursesAnalytics
);
analyticsRoute.get(
  "/get-orders-analytics",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getOrdersAnalytics
);

export default analyticsRoute;
