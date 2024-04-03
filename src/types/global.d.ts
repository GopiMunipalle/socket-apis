declare global {
  namespace Express {
    interface Request {
      email: string;
      _id: string;
    }
  }
}

export {};
