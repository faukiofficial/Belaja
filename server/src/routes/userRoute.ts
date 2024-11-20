import express from "express";
const userRouter = express.Router();
import {
  registerUser,
  activateUser,
  getAllUsers,
  loginUSer,
  logoutUser,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updateUserPassword,
  updateProfilePicture,
  updateUserRole,
  deleteUser,
  refreshTokenController,
} from "../controllers/userController";
import { validateUserRole } from "../middlewares/validateUserRole";
import { authenticateAndRefreshToken } from "../middlewares/authenticateAndRefreshToken ";

userRouter.post("/registration", registerUser); // done
userRouter.post("/activate-user", activateUser); // done
userRouter.get(
  "/get-users",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  getAllUsers
); // done
userRouter.post("/login", loginUSer); // done
userRouter.get("/logout", authenticateAndRefreshToken, logoutUser); // done
userRouter.get("/refresh-token", refreshTokenController); // done
userRouter.get("/me", authenticateAndRefreshToken, getUserInfo); // done
userRouter.post("/social-auth", socialAuth); // need some fixing
userRouter.put(
  "/update-user-info",
  authenticateAndRefreshToken,
  updateUserInfo
); // done
userRouter.put(
  "/update-user-password",
  authenticateAndRefreshToken,
  updateUserPassword
); // done
userRouter.put(
  "/update-user-avatar",
  authenticateAndRefreshToken,
  updateProfilePicture
); // done
userRouter.put(
  "/update-user-role",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  updateUserRole
); // done
userRouter.delete(
  "/delete-user/:id",
  authenticateAndRefreshToken,
  validateUserRole("admin"),
  deleteUser
); // done

export default userRouter;
