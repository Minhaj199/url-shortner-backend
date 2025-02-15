import { Types } from "mongoose";
import { Document } from "mongoose";

export interface User {
  FullName: string;
  Email: string;
  Password: string;
}

export interface IUser extends User, Document {}
export interface ShortUrl {
  originalUrl: string;
  shortUrl: string;
  userId: Types.ObjectId;
}
export interface IUrl extends ShortUrl, Document {}
