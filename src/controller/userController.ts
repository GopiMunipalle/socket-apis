import { Request, Response } from "express";
import userModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return res
        .status(201)
        .send({ msg: "User Created Successfully", newUser });
    }
    return res.status(400).send({ error: "User Already Exists" });
  } catch (error) {
    console.log({ error: "Internal Server Error" }, error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "user not registered" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ error: "Incorrect Password" });
    }
    const jwtToken = await jwt.sign({ email: email }, "secret", {
      expiresIn: "10h",
    });
    return res.status(200).send({ jwtToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export default { register, login };
