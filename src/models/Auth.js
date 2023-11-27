import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

const AuthModel = new Schema(
  {
    otp: { type: Number, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: true,
    },
    attempts: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

AuthModel.methods.verifyOTP = function (payload) {
  let auth = this;
  return auth.otp === payload;
};

AuthModel.plugin(deepPopulate);

export const Auth = new mongoose.model(MODELS.AUTH, AuthModel);
