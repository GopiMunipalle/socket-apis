import { Router } from "express";
import groupController from "../controller/groupController";
const groupRouter = Router();
import { authMiddleware } from "../middlewares/authMiddleware";

groupRouter.post("/createGroup", authMiddleware, groupController.createGroup);
groupRouter.post(
  "/send/:groupId",
  authMiddleware,
  groupController.sendMessageInGroup
);

export default groupRouter;
