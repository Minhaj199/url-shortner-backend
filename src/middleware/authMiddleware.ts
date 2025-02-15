import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utilities/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incommingToken = req.headers["accesstoken"];

  if (!incommingToken) {
    res.status(400).json({ message: "Access Denied" });
  } else {
    try {
      const decode = verifyToken(incommingToken);

      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "invalid token" });
    }
  }
};
