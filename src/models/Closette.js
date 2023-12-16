import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

// Enum for predefined section names
export const defaultSections = [
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

// Define a schema for a wardrobe section
const SectionSchema = new Schema({
  name: {
    type: String,
    required: "pleae assign name to section",
  },
  items: {
    type: Array,
  }, // An array of items in this section
});

const WardrobeSchema = new Schema(
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
    location: { type: String, trim: true },
    description: { type: String, trim: true, maxLength: 255 },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

// closette pre-save middleware
WardrobeSchema.pre("save", function (next) {
  // Ensure that the values is in lowercase before saving
  if (this.isModified("name")) {
    this.name = this.name.toLowerCase();
  }
  next();
});

WardrobeSchema.plugin(deepPopulate);

export const Closette = new mongoose.model(MODELS.CLOSETTE, WardrobeSchema);

export const ClosetteSection = new mongoose.model(
  MODELS.CLOSETTE_SECTION,
  SectionSchema
);
