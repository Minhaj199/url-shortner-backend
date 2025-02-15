import jwt from "jsonwebtoken";
export function createToken(id, email, name) {
    try {
        const token = jwt.sign({ id, email: email, name }, process.env.JEW_KEY, { expiresIn: "1h" });
        return token;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
export function verifyToken(token) {
    if (typeof token !== "string") {
        throw new Error("token not found");
    }
    try {
        const decode = jwt.verify(token, process.env.JEW_KEY);
        return decode;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("internal server error");
    }
}
