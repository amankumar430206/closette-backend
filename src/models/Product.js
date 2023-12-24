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
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.CLOSETTE_SECTION, // Reference to the section model
    required: true,
  },
  closette: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.CLOSETTE, // Reference to the closette model
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
});

ProductSchema.plugin(deepPopulate);

export const Products = new mongoose.model(MODELS.PRODUCT, ProductSchema);
