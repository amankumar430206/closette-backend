import JWT from "jsonwebtoken";
import { HEADERS } from "../const.js";

const { verify } = JWT;

export const VerifyToken = (req, res, next) => {
  const token = req.headers[HEADERS.AUTH_TOKEN];
  if (token) {
    verify(token, process.env.CL_AUTH_JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          msg: "failed to authenticate",
          err,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      msg: "unauthorized access",
    });
  }
};
