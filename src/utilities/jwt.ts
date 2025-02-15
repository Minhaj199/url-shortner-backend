import jwt from "jsonwebtoken";

export function createToken(id: string, email: string, name: string) {
  try {
    const token: string = jwt.sign(
      { id, email: email, name },
      process.env.JEW_KEY as string,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export function verifyToken(token: unknown) {
  if (typeof token !== "string") {
    throw new Error("token not found");
  }
  try {
    const decode = jwt.verify(token, process.env.JEW_KEY as string);
    return decode as { id: string; email: string; name: string };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("internal server error");
  }
}
