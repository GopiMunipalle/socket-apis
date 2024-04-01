import messageController from "../controller/messageController";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post("/sendMessage", messageController.sendMesssage);
messageRouter.get("/receiveMessage/:userId", messageController.receiveMessage);

export default messageRouter;
