import { Closette } from "../models/Closette.js";
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

  getByUserId: async (req, res, next) => {
    try {
      let data = await Closette.find({ owner: req.params.id });

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

      let newClosette = new Closette({
        owner: req.decoded._id,
        name: req.body.name,
        location: req.body.location,
      });

      const data = await newClosette.save();

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },
};
