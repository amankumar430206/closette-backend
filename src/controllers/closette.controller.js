import { Closette, CATEGORIES } from "../models/Closette.js";
import { closetteValidatiion } from "../models/validations/closette.validation.js";

export default {
  getAll: async (req, res, next) => {
    try {
      let data = await Closette.find({});
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
      let data = await Closette.findOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  getCategories: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        content: CATEGORIES,
      });
    } catch (err) {
      next(err);
    }
  },

  getByUserId: async (req, res, next) => {
    try {
      let data = await Closette.find({ user: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      // validating the closette payload
      const { error } = closetteValidatiion.validate(req.body);

      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      const user = req.body.user || req.decoded._id;

      const duplicateFound = await Closette.findOne({
        user: user,
        name: req.body.name.trim(),
      });

      if (duplicateFound)
        return res.status(400).json({
          success: false,
          msg: "you have already created closette with the same name",
        });

      const { name, description } = req.body;

      let closette = new Closette({
        user: user,
        name: name,
        description: description,
      });

      // save the closette for the user
      const data = await closette.save();

      res.status(200).json({
        success: true,
        msg: "closette has been created successfully!",
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  assignClosetteToProduct: async (req, res, next) => {
    try {
      const user = req.body.user || req.decoded._id;

      const closette = await Closette.findOne({
        _id: req.body.closetteId,
      });

      if (!closette)
        return res.status(400).json({
          success: false,
          msg: "no closette found",
        });

      const { productId, closetteId } = req.body;

      res.status(200).json({
        success: true,
        msg: "closette has been created successfully!",
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  assign: async (req, res, next) => {
    try {
      // validating the closette payload
      const { error } = closetteValidatiion.validate(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },
};

const generateSections = (sections = [], closetteId) => {
  return sections.map((name) => {
    return {
      name: name?.toLowerCase(),
      items: [],
      closette: closetteId,
    };
  });
};
