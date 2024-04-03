import { Schema, model } from "mongoose";

type contentT = {
  message: string[];
};

const contentSchema = new Schema<contentT>(
  {
    message: {
      type: [],
    },
  },
  { versionKey: false, timestamps: true }
);

type messageT = {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: { message: string[] };
};

const messageSchema = new Schema<messageT>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: contentSchema, required: true },
  },
  { versionKey: false, timestamps: true }
);

const messageModel = model<messageT>("Message", messageSchema);
export default messageModel;
