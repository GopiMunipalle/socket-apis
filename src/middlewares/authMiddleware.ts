import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      return res.status(400).send({ error: "Enter Token" });
    }
    const jwtToken = authHeaders.split(" ")[1];
    if (!jwtToken) {
      return res.status(400).send({ error: "Provide token" });
    }
    jwt.verify(jwtToken, "secret", (error: any, payload: any) => {
      if (error) {
        return res.status(400).send({ error: "Invalid token" });
      }
      req.email = (payload as JwtPayload).email;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
