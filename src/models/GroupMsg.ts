import { Schema, model } from "mongoose";

type contentT = {
  message: string;
};

const messageSchema = new Schema<contentT>({
  message: {
    type: String,
    required: false,
  },
});

type GroupT = {
  name: string;
  admin: Schema.Types.ObjectId;
  participants: [];
  content: { message: string };
};

const groupSchema = new Schema<GroupT>({
  name: { type: String, ref: "User", required: true },
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: { type: [], required: true },
  content: { type: messageSchema, required: false },
});

const groupModel = model<GroupT>("Group", groupSchema);
export default groupModel;
