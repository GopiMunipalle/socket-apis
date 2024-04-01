import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      email: string;
      _id: string;
    }
  }
}
