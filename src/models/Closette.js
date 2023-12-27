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
  closette: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.CLOSETTE,
    required: "please assign closette to the section",
  },
  name: {
    type: String,
    required: "pleae assign name to section",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.PRODUCT,
    },
  ],
});

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
    location: { type: String, trim: true },
    description: { type: String, trim: true, maxLength: 255 },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.CLOSETTE_SECTION,
      },
    ],
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

export const ClosetteSection = new mongoose.model(
  MODELS.CLOSETTE_SECTION,
  SectionSchema
);
