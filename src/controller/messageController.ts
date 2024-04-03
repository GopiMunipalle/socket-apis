import messageModel from "../models/Messages";
import userModel from "../models/User";
import { Request, Response } from "express";

const sendMesssage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    const userEmail = req.email;
    const sender = await userModel.findOne({ email: userEmail });
    const receiver = await userModel.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const chat = await messageModel.create({
      sender: sender._id,
      receiver: receiverId,
      content: { message: content },
    });

    return res.status(201).json(chat);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const receiveMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const userEmail = req.email;
    const user = await userModel.findOne({ email: userEmail });
    let userId = user?._id as any;
    const messages = await messageModel.find({
      $and: [{ sender: userId }, { receiver: receiverId }],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error receiving messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { sendMesssage, receiveMessage };
