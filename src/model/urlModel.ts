import mongoose, { Schema } from "mongoose";
import { IUrl } from "../types/types.js";

const schema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const urlModel = mongoose.model<IUrl>("urls", schema);
