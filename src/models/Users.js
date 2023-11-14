import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import { genSalt, compareSync, hash } from "bcrypt-nodejs";
import mongooseDeepPopulate from "mongoose-deep-populate";

const deepPopulate = mongooseDeepPopulate(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, trim: true, unique: true },
    username: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true },
    role: {
      type: String,
      enum: ["ADMIN", "CLIENT"],
      trim: true,
      default: "CLIENT",
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 1024,
      required: true,
    },
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

UserSchema.methods.generateToken = function () {
  const user = this;
  const token = Jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.CL_AUTH_JWT_SECRET_KEY,
    {
      expiresIn: "10m", // 1 hr duration
    }
  );
  return token;
};

UserSchema.plugin(deepPopulate);

export const Users = new mongoose.model("users", UserSchema);
