import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import { genSalt, compareSync, hash } from "bcrypt-nodejs";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

export const GENDER_ENUM = ["M", "F", "O"];

const UserSchema = new Schema(
  {
    email: { type: String, trim: true, unique: true },
    username: { type: String, trim: true, required: true },
    otp: { type: Number },
    role: {
      type: String,
      enum: ["ADMIN", "CLIENT"],
      trim: true,
      default: "CLIENT",
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 4,
      required: true,
    },
    name: String,
    gender: {
      type: String,
      enum: GENDER_ENUM,
      required: true,
    },
    photo: { type: String, trim: true, default: null },
    dob: { type: String, trim: true, required: true },
    contact: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  let user = this;
  if (this.isModified("password") || this.isNew) {
    genSalt(12, function (error, salt) {
      if (error) return next(error);
      hash(user.password, salt, null, function (error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.verifyPassword = function (password) {
  let user = this;
  return compareSync(password, user.password);
};

UserSchema.methods.verifyOTP = function (payload) {
  return this.otp === payload;
};

UserSchema.methods.generateToken = function () {
  const user = this;
  const token = Jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.CL_AUTH_JWT_SECRET_KEY,
    {
      expiresIn: "10m", // 1 hr duration
    }
  );
  return token;
};

UserSchema.plugin(deepPopulate);

export const Users = new mongoose.model(MODELS.USERS, UserSchema);
