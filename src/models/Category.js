import mongoose from "mongoose";
import { MODELS } from "./model-consts.js";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, trim: true, unique: true, required: true },
    description: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.CATEGORY, // Reference to the category model
    },
  },
  { timestamps: true }
);

export const Category = new mongoose.model(MODELS.CATEGORY, CategorySchema);
