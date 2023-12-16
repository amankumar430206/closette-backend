import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.CATEGORY, // Reference to the Categories model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.USERS, // Reference to the Users model
    required: true,
  },
  image: {
    type: String, // URL or file path to the product image
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },

  color: {
    type: String,
  },
  size: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  features: {
    type: [String], // Array of product features
  },
});

ProductSchema.plugin(deepPopulate);

export const Products = new mongoose.model(MODELS.PRODUCT, ProductSchema);
