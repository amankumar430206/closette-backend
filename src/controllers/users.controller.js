import { Users } from "../models/Users.js";
import { userDetailsValidation } from "../models/validations/user.validation.js";
export default {
  // get users list
  USERS: async (req, res, next) => {
    try {
      let users = await Users.find({});

      res.status(200).json({
        success: true,
        content: users,
      });
    } catch (err) {
      next(err);
    }
  },

  // get single user details
  USER: async (req, res, next) => {
    try {
      let user = await Users.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({
          msg: "profile not found",
          success: false,
        });
      }

      res.status(200).json({
        success: true,
        content: user,
      });
    } catch (err) {
      next(err);
    }
  },

  // update user details
  UPDATE_USER: async (req, res, next) => {
    try {
      let user = await Users.findOne({ _id: req.decoded._id });

      if (!user) {
        return res.status(400).json({
          msg: "User Not Found",
          success: false,
        });
      }

      // validate user data
      const { error } = userDetailsValidation.validate(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      const userDetails = {
        username: req.body.username,
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        contact: req.body.contact?.trim(),
      };

      // update found user with req.body or payload
      const result = await Users.findOneAndUpdate(
        {
          _id: user._id,
        },

        // payload to update
        {
          ...userDetails,
        }
      );

      res.status(200).json({
        success: true,
        msg: "user updated successfully",
        result,
      });
    } catch (err) {
      next(err);
    }
  },

  // update user photo
  UPDATE_PHOTO: async (req, res, next) => {
    try {
      let user = await Users.findOne({ _id: req.decoded._id });

      if (!user) {
        return res.status(400).json({
          msg: "User Not Found",
          success: false,
        });
      }

      // update found user with req.body or payload
      const result = await Users.findOneAndUpdate(
        {
          _id: user._id,
        },

        // payload to update
        {
          photo: `${user.name}'s photo url get from s3 bucket`,
        }
      );

      res.status(200).json({
        success: true,
        msg: "user updated successfully",
        result,
      });
    } catch (err) {
      next(err);
    }
  },
};
