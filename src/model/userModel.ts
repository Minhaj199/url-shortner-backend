import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types.js";
import { passwordHashing } from "../utilities/bcrypt.js";

const schema = new Schema<IUser>({
  FullName: String,
  Email: { type: String, unique: true },
  Password: String,
});
schema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  try {
    const hashedPassword = await passwordHashing(this.Password);
    this.Password = hashedPassword;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
export const userModel = mongoose.model<IUser>("users", schema);
