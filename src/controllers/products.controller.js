import { Products } from "../models/Product.js";
import { Users } from "../models/Users.js";
import { productValidationSchema } from "../models/validations/products.validation.js";
import { getSignedImageUrl, uploadDocument } from "../services/s3.js";
import { PaginateQuery } from "../utils/utils.js";

export default {
  getAll: async (req, res, next) => {
    try {
      const pagination = await PaginateQuery(req.query, Products);

      const data = await Products.find({})
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);

      // remapping for image url
      for (let i = 0; i < data.length; i++) {
        const url = await getSignedImageUrl(data[i].image);
        data[i].image = url;
      }

      res.status(200).json({
        success: true,
        content: data,
        ...pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  filterProducts: async (req, res, next) => {
    try {
      const pagination = await PaginateQuery(req.query, Products);
      const filterConditions = [
        {
          user: req.query?.user,
        },
        {
          closette: req.query?.closette,
        },
      ];

      const data = await Products.find({
        $or: filterConditions,
      })
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);

      // remapping for image url
      for (let i = 0; i < data.length; i++) {
        const url = await getSignedImageUrl(data[i].image);
        data[i].image = url;
      }

      res.status(200).json({
        success: true,
        content: data,
        ...pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      let data = await Products.find({ _id: req.params.id });

      // remapping for image url
      if (data.length)
        for (let i = 0; i < data.length; i++) {
          let signedImages = [];
          for (let j = 0; j < data[i].image.length; j++) {
            const imageUrl = await getSignedImageUrl(data[i].image[j]);
            signedImages.push(imageUrl);
          }
          data[i].image = signedImages;
        }

      res.status(200).json({
        success: true,
        content: data[0] || {},
      });
    } catch (err) {
      next(err);
    }
  },

  getByUserId: async (req, res, next) => {
    try {
      const pagination = await PaginateQuery(req.query, Products);
      const data = await Products.find({ user: req.params.id })
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);

      // remapping for image url
      for (let i = 0; i < data.length; i++) {
        let signedImages = [];
        for (let j = 0; j < data[i].image.length; j++) {
          const imageUrl = await getSignedImageUrl(data[i].image[j]);
          signedImages.push(imageUrl);
        }
        data[i].image = signedImages;
      }

      res.status(200).json({
        success: true,
        content: data,
        ...pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  getByClosetteId: async (req, res, next) => {
    try {
      const pagination = await PaginateQuery(req.query, Products);

      // filter by category
      const category = req.query.category;

      const query = {
        closette: req.params.id,
      };

      if (category) {
        query.category = category;
      }

      // filter products by category
      const data = await Products.find(query)
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);

      // remapping for image url
      for (let i = 0; i < data.length; i++) {
        let signedImages = [];
        for (let j = 0; j < data[i].image.length; j++) {
          const imageUrl = await getSignedImageUrl(data[i].image[j]);
          signedImages.push(imageUrl);
        }
        data[i].image = signedImages;
      }

      res.status(200).json({
        success: true,
        content: data,
        ...pagination,
      });
    } catch (err) {
      next(err);
    }
  },

  addProduct: async (req, res, next) => {
    try {
      // can be retrieved from, token or body
      const userId = req.body.user || req.decoded._id;

      const { error } = productValidationSchema.validate({
        ...req.body,
        image: req.files,
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

      const images = req.files;
      const processedDocuments = [];

      // push files to product.image
      for (let i = 0; i < images.length; i++) {
        const title = images.length > 1 ? "" : req.body.title;

        // assign product with the user
        const product = new Products({
          closette: req.body.closette,
          category: req.body.category,
          user: user._id,
          title: title,
          description: req.body.description,
          image: [], // key(image) is the image identifier
        });

        //upload document to s3 bucket
        const image = await uploadDocument(images[i]);

        product.image.push(image.filename);
        processedDocuments.push(product);
      }

      const result = await Products.insertMany(processedDocuments);

      res.status(200).json({
        success: true,
        msg: "product(s) added successfully",
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
