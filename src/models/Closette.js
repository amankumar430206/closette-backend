import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

// Enum for predefined section names
export const CATEGORIES = [
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
  "Shoes",
  "Dresses",
  "Headwear",
  "Socks",
  "Sportswear",
  "Formalwear",
];

const ClosetteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: "please assign a user for the closette",
    },
    name: {
      type: String,
      trim: true,
      required: "please provide name for your closette",
      lowercase: true,
    },
    description: { type: String, trim: true, maxLength: 255 },
  },
  { timestamps: true }
);

// closette pre-save middleware
ClosetteSchema.pre("save", function (next) {
  // Ensure that the values is in lowercase before saving
  if (this.isModified("name")) {
    this.name = this.name.toLowerCase();
  }
  next();
});

ClosetteSchema.plugin(deepPopulate);

export const Closette = new mongoose.model(MODELS.CLOSETTE, ClosetteSchema);
