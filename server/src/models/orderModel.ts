import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  course: object;
  user: object;
  payment_info: object;
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment_info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default OrderModel;
