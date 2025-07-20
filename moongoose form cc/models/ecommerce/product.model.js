import mongoose from "mongoose";
import { Category } from "./category.model";

const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    productImage: {
      // should be kept somewhere just called here in mongo we can keep but we shouldnt
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      default: 0,
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { tiemstamps: true }
);

export const Product = mongoose.model("Product", productSchema);
