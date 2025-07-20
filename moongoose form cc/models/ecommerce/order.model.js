import mongoose from "mongoose";

const orderItemschema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemschema],
      // or
      //   type: [
      //     {
      //       productId: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: "Product",
      //         required: true,
      //       },
      //       quantity: {
      //         type: Number,
      //         required: true,
      //       },
      //     },
      //   ],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DILIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
