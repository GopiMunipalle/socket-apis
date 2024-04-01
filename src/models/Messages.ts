import { Schema, model } from "mongoose";

type messageT = {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: string;
};

const messageSchema = new Schema<messageT>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
});

const messageModel = model<messageT>("Message", messageSchema);
export default messageModel;
