import { Request, Response } from "express";
import groupModel from "../models/GroupMsg";
import userModel from "../models/User";

const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, receiverId } = req.body;

    const userEmail = req.email;

    const user = await userModel.findOne({ email: userEmail });

    if (!Array.isArray(receiverId) || receiverId.length < 2) {
      return res
        .status(400)
        .send({ error: "At least two receiver IDs are required" });
    }

    if (receiverId.includes(user?._id)) {
      return res
        .status(400)
        .send({ error: "Admin should not be included in the receiver list" });
    }

    const users = await userModel.find({ _id: { $in: receiverId } });
    if (users.length !== receiverId.length) {
      const missingUsers = receiverId.filter(
        (id) => !users.find((user) => user._id === id)
      );
      return res
        .status(404)
        .send({ error: `Users ${missingUsers.join(",")} not found` });
    }

    const newGroup = await groupModel.create({
      name: name,
      admin: user?._id,
      participants: receiverId,
    });

    return res
      .status(201)
      .send({ newGroup, result: `Group created by ${user?.name}` });
  } catch (error) {
    console.error("Error creating chat group:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const sendMessageInGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;
    const userMail = req.email;

    const user = await userModel.findOne({ email: userMail });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const updatedGroup = await groupModel.findByIdAndUpdate(
      groupId,
      {
        $push: { content: { sender: user._id, message: message } },
      },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).send({ error: "Group not found" });
    }

    return res
      .status(200)
      .send({ message: "Message sent successfully", group: updatedGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export default { createGroup, sendMessageInGroup };
