import { Users } from "../models/Users.js";

export default {
  // sign-in
  LOGIN: async (req, res, next) => {
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

  // sign-up
  REGISTER: async (req, res, next) => {
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

  // send one time password, for OTP verificatino page
  SEND_OTP: async (req, res, next) => {
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

  // sign-up
  REGISTER: async (req, res, next) => {
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
