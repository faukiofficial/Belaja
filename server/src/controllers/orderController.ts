import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel from "../models/orderModel";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";
import notificationModel from "../models/notificationModel";
import path from "path";
import ejs, { name } from "ejs";
import sendMail from "../utils/sendMail";

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body;

      const user = await userModel.findById(req.user?._id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isCourseExistInUser = user?.courses?.find(
        (course: any) => course._id.toString() === courseId
      )

      if (isCourseExistInUser) {
        return next(new ErrorHandler("Course already purchased", 400));
      }

      const course = await courseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        user: user._id,
        course: course._id,
        payment_info,
      };

      const order = await OrderModel.create(data);

      const mailData = {
        user: {
          name: user.name,
        },
        order: {
          _id: String(course._id).slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/orderConfirmation.ejs"),
        mailData
      )

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "orderConfirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }

      user.courses?.push(course?._id as any);
      await user.save();

      const notification = await notificationModel.create({
        title: "New Order",
        message: `You have a new order for ${course.name}`,
        userId: user._id,
      });

      if(course.purchased || course.purchased === 0) {
        course.purchased = course.purchased + 1;
      }

      await course.save();

      res.status(201).json({
        success: true,
        order,
      });
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all orders - only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderModel.find()
      .populate({
        path: "course",
        select: "name price category",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
