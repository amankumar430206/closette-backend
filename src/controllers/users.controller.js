import { Users } from "../models/Users.js";

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
      const { username, password } = req.body;
      let user = await Users.findOne({ username });

      if (!user) {
        return res.status(401).json({
          msg: "Invalid Credentials",
          success: false,
        });
      }

      const passwordMatched =
        password === user.password || (await user.verifyPassword(password));

      if (!passwordMatched)
        return res.status(401).json({
          success: false,
          msg: "Invalid Password.. Please try Again",
        });

      // generating a token
      const token = user.generateToken();

      res.status(200).json({
        success: true,
        msg: "token generated successfully",
        token,
      });
    } catch (err) {
      next(err);
    }
  },
};
