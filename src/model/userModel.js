var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
import { passwordHashing } from "../utilities/bcrypt.js";
const schema = new Schema({
    FullName: String,
    Email: { type: String, unique: true },
    Password: String,
});
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("Password")) {
            return next();
        }
        try {
            const hashedPassword = yield passwordHashing(this.Password);
            this.Password = hashedPassword;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    });
});
export const userModel = mongoose.model("users", schema);
