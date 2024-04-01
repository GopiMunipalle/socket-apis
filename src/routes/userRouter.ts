import userController from "../controller/userController";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/addUser", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
