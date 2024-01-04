import { Products } from "../models/Product.js";
import { productValidationSchema } from "../models/validations/products.validation.js";
import { Users } from "../models/Users.js";
import {
  s3,
  PutObjectCommand,
  bucketName,
  generateFileName,
  getSignedImageUrl,
} from "../services/s3.js";

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
      const data = await Products.find({ user: req.params.id });

      res.status(200).json({
        success: true,
        content: data,
      });
    } catch (err) {
      next(err);
    }
  },

  addProduct: async (req, res, next) => {
    try {
      // can be retrieved from, token or body
      const userId = req.body.user || req.decoded._id;

      console.log(req.file);

      const { error } = productValidationSchema.validate({
        ...req.body,
        image: req.file,
      });
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      let user = await Users.findOne({ _id: userId });
      if (!user)
        res.status(400).json({
          success: true,
          msg: "bad request",
        });

      //parse image and upload to s3
      const _params = {
        Bucket: bucketName,
        Body: req.file.buffer,
        Key: generateFileName(),
        ContentType: req.file.mimetype,
      };
      // save image to s3
      const command = new PutObjectCommand(_params);

      const uploaded = await s3.send(command);

      console.log("uploaded image props", uploaded);

      // assign product with the user
      const product = new Products({
        closette: req.body.closette,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        color: req.body.color,
        user: user._id,
        image: _params.Key, // key is the image identifier
      });

      const result = await product.save();

      res.status(200).json({
        success: true,
        msg: "product added successfully",
        content: result,
      });
    } catch (err) {
      next(err);
    }
  },

  assignClosette: async (req, res, next) => {
    try {
      // can be retrieved from, token or body
      const userId = req.body.user || req.decoded._id;

      let user = await Users.findOne({ _id: userId });
      if (!user)
        res.status(400).json({
          success: true,
          msg: "bad request",
        });

      const updated = await Products.updateOne(
        {
          _id: req.body.product,
        },
        {
          closette: req.body.closette,
        }
      );

      res.status(200).json({
        success: true,
        msg: "product updated successfully",
        content: updated,
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

  getImageFromS3: async (req, res, next) => {
    try {
      const imageName = req.params.imageName;

      if (!imageName)
        return res.status(400).json({
          success: true,
          msg: "bad request",
        });

      const url = await getSignedImageUrl(imageName);

      res.status(200).json({
        success: true,
        content: url,
      });
    } catch (err) {
      next(err);
    }
  },
};
