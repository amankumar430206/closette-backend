import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS, // Reference to the Users model
      required: true,
    },
    closette: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.CLOSETTE, // Reference to the closette model
      },
    ],
    category: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or file path to the product image
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(deepPopulate);

export const Products = new mongoose.model(MODELS.PRODUCT, ProductSchema);
