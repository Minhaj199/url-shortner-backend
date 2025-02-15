import { verifyToken } from "../utilities/jwt.js";
export const authMiddleware = (req, res, next) => {
    const incommingToken = req.headers["accesstoken"];
    if (!incommingToken) {
        res.status(400).json({ message: "Access Denied" });
    }
    else {
        try {
            const decode = verifyToken(incommingToken);
            req.user = decode;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "invalid token" });
        }
    }
};
