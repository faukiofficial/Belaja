import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";

// get all notifications for admin
export const getNotifications = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notifications = await NotificationModel.find().sort({
                createdAt: -1,
            });
            res.status(200).json({
                success: true,
                notifications,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// get all notifications for user
export const getUserNotifications = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notifications = await NotificationModel.find({
                userId: req.user?._id,
            }).sort({
                createdAt: -1,
            });
            res.status(200).json({
                success: true,
                notifications,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// update notification status
export const markNotificationAsRead = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notification = await NotificationModel.findById(req.params.id);
            if (!notification) {
                return next(new ErrorHandler("Notification not found", 404));
            }
            notification.status = "read";
            await notification.save();

            const notifications = await NotificationModel.find().sort({
                createdAt: -1,
            })
            res.status(200).json({
                success: true,
                message: "Notification status updated",
                notifications
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// delete notification with cron scheduler
cron.schedule("0 0 0 * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({
        status: "read",
        createdAt: { $lt: thirtyDaysAgo },
    });
});
