const layoutRouter = require("express").Router();
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layoutController";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";
import { validateUserRole } from "../middlewares/validateUserRole";

layoutRouter.post(
  "/create-layout",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  createLayout
);
layoutRouter.put(
  "/edit-layout",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  editLayout
);
layoutRouter.post(
  "/get-layout-by-type",
  getLayoutByType
);

export default layoutRouter;
