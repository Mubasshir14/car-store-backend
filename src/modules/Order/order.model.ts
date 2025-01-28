import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cars: [
      {
        car: {
          type: Schema.Types.ObjectId,
          ref: "Car",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        fuelType: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        milage: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        city: {
          type: String,
         
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<TOrder>("Order", OrderSchema);

export default Order;