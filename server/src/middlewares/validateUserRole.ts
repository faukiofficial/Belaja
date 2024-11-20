import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

// validate user role
export const validateUserRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user?.role)) {
      return next(new ErrorHandler(`Role: ${req.user?.role}. You are not authorized to access this`, 403));
    }
    next();
  };
};