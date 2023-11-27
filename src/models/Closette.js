import mongoose from "mongoose";
import mongooseDeepPopulate from "mongoose-deep-populate";
import { MODELS } from "./model-consts.js";

const deepPopulate = mongooseDeepPopulate(mongoose);
const Schema = mongoose.Schema;

const ClosetteSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: true,
    },
    name: { type: String, trim: true, required: true },
    location: { type: String, trim: true },
    description: { type: String, trim: true, maxLength: 255 },
  },
  { timestamps: true }
);

ClosetteSchema.plugin(deepPopulate);

export const Closette = new mongoose.model(MODELS.CLOSETTE, ClosetteSchema);
