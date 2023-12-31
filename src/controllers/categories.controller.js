import { Closette } from "../models/Closette.js";
import { Category } from "../models/Category.js";

export default {
  getAll: async (req, res, next) => {
    try {
      let data = await Category.find({});

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  getSubCategoryByParent: async (req, res, next) => {
    try {
      let data = await Category.find({ parentCategory: req.body.categoryId });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  addCategories: async (req, res, next) => {
    try {
      const data = await Category.insertMany(req.body.categories);
      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },
};
