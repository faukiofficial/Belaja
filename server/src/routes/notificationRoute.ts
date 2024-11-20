import express from "express";
const notificationRouter = express.Router();
import {
  getNotifications,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController";
import { validateUserRole } from "../middlewares/validateUserRole";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";

notificationRouter.get(
  "/get-notifications",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getNotifications
);
notificationRouter.get(
  "/get-user-notifications",
  authenticateAndRefreshToken,
  getUserNotifications
);
notificationRouter.put(
  "/mark-notification-as-read/:id",
  authenticateAndRefreshToken,
  markNotificationAsRead
);

export default notificationRouter;
