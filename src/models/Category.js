import mongoose from "mongoose";
import { MODELS } from "./model-consts.js";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, trim: true, unique: true, required: true },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.SUBCATEGORY,
      },
    ],
  },
  { timestamps: true }
);

const SubCategorySchema = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.CATEGORY,
    },
    name: { type: String, trim: true, unique: true, required: true },
  },
  { timestamps: true }
);

export const Category = new mongoose.model(MODELS.CATEGORY, CategorySchema);
export const SubCategories = new mongoose.model(
  MODELS.SUBCATEGORY,
  SubCategorySchema
);
