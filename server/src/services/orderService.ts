import { NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import OrderModel from "../models/orderModel";

// create order sevice
export const newOrder = CatchAsyncError(async (data: any, next: NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);

})
