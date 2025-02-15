import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true });
export const urlModel = mongoose.model("urls", schema);
