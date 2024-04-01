import messageModel from "../models/Messages";
import userModel from "../models/User";
import { Request, Response } from "express";
import { io } from "../app";

const sendMesssage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const message = await messageModel.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    io.to(receiver as any).emit("chat message", message);
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const receiveMessage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const messages = await messageModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error receiving messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { sendMesssage, receiveMessage };
