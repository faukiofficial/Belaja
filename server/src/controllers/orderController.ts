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
// import Stripe from "stripe"
import { redis } from "../utils/redis";
import midtransClient from "midtrans-client";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
});

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body;

      // if (payment_info) {
      //   if("id" in payment_info) {
      //     const paymentIntentId = payment_info.id
      //     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      //     if(paymentIntent.status !== "succeeded") {
      //       return next(new ErrorHandler("Payment not authorized", 400));
      //     }
      //   }
      // }

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

      const order = await OrderModel.create({
        user: user._id,
        course: course._id,
        payment_info,
      });

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

      user?.courses?.push(course?._id as any);

      await redis.set(req.user?._id as string, JSON.stringify(user) as any);

      await user?.save();

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

// // sent stripe publishble key
// export const sendStripePublishableKey = CatchAsyncError(
//   async(req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.status(200).json({
//         success: true,
//         stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// )

// // new payment
// export const newPayment = CatchAsyncError(
//   async(req: Request, res: Response, next: NextFunction) => {
//     try {
//       const myPayment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "idr",
//         metadata: {
//           company: "Belaja",
//         },
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       })
//       res.status(201).json({
//         success: true,
//         client_secret: myPayment.client_secret
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// )

// Payment with Midtrans - create transaction
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, grossAmount, paymentType } = req.body;

      // Validate paymentType (only accepts specific bank transfers)
      const validBankTransfers = ["bsi", "bni", "mandiri", "bca", "bri", "muamalat"];
      if (!validBankTransfers.includes(paymentType)) {
        return next(new ErrorHandler("Invalid bank transfer option", 400));
      }

      // Configure transaction parameters for Midtrans
      const parameter = {
        payment_type: "bank_transfer",
        bank_transfer: {
          bank: paymentType, // Bank options: bsi, bni, mandiri, bca, bri, muamalat
        },
        order_id: orderId,
        gross_amount: grossAmount,
        customer_details: {
          email: req.user?.email, // Assumes user details are available in the request
          first_name: req.user?.name,
        },
      };

      // Create a new transaction using the Midtrans API
      const transaction = await coreApi.transaction(parameter);

      // Ensure the response includes a token for Midtrans payment
      if (!transaction.token) {
        return next(new ErrorHandler("Failed to create payment transaction", 500));
      }

      res.status(201).json({
        success: true,
        token: transaction.token, // Ensure this field matches what `handleBuy` expects
        transaction,
      });
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// Get payment status
export const getPaymentStatus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const status = await coreApi.transactionStatus(orderId);

      res.status(200).json({
        success: true,
        status,
      });
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);