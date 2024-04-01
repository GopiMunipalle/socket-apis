import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (
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
    jwt.verify(jwtToken, "secret", (error, payload) => {
      if (error) {
        return res.status(400).send({ error: "Invalid token" });
      }
      req.email = (jwt as JwtPayload).email;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
