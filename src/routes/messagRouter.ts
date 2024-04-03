import messageController from "../controller/messageController";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
const messageRouter = Router();

messageRouter.post(
  "/sendMessage",
  authMiddleware,
  messageController.sendMesssage
);
messageRouter.get(
  "/receiveMessage/:receiverId",
  authMiddleware,
  messageController.receiveMessage
);

export default messageRouter;
