import { Products } from "../models/Product.js";
import { productValidationSchema } from "../models/validations/products.validation.js";
import { Users } from "../models/Users.js";

export default {
  getAll: async (req, res, next) => {
    try {
      let data = await Products.find({});

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      let data = await Products.findOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  getByUserId: async (req, res, next) => {
    try {
      let data = await Products.find({ owner: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      let user = await Users.findOne({ _id: req.body.owner });
      if (!user)
        res.status(400).json({
          success: true,
          msg: "bad request",
        });

      const { error } = productValidationSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      const newProduct = new Products({
        ...req.body,
      });

      const saved = await newProduct.save();

      res.status(200).json({
        success: true,
        content: saved,
      });
    } catch (err) {
      next(err);
    }
  },

  removeById: async (req, res, next) => {
    try {
      let data = await Products.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },
};
