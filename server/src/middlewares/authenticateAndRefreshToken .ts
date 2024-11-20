import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "./catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { accessTokenOptions, refreshTokenOptions } from "../utils/jwt";
import { redis } from "../utils/redis";

export const authenticateAndRefreshToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let accessToken = req.cookies.accessToken as string;

      if (!accessToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
      }

      try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as Secret) as JwtPayload;
        const user = await redis.get(decoded.id);

        if (!user) {
          return next(new ErrorHandler("User session not found, please login again", 404));
        }

        req.user = JSON.parse(user);
        return next();

      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          const refresh_token = req.cookies.refreshToken as string;
          if (!refresh_token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
          }

          const decodedRefresh = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as Secret) as JwtPayload;
          const session = await redis.get(decodedRefresh.id);

          if (!session) {
            return next(new ErrorHandler("Session expired, please login again", 404));
          }

          const user = JSON.parse(session) as IUser;

          accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, { expiresIn: "5m" });
          const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, { expiresIn: "7d" });

          res.cookie("accessToken", accessToken, accessTokenOptions);
          res.cookie("refreshToken", refreshToken, refreshTokenOptions);

          req.user = user; 
          return next();
        } else {
          return next(new ErrorHandler("Access token is invalid", 401));
        }
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
