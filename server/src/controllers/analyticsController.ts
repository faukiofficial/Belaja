import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import userModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

// get user analytics - for admin
export const getUsersAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await generateLast12MonthsData(userModel);

            res.status(200).json({
                success: true,
                users,
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// get courses analytics - for admin
export const getCoursesAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await generateLast12MonthsData(CourseModel);
            res.status(200).json({
                success: true,
                courses
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

// get orders analytics - for admin
export const getOrdersAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await generateLast12MonthsData(OrderModel);
            res.status(200).json({
                success: true,
                orders
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)