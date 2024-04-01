import mongoose, { Schema } from "mongoose";

type userT = {
  name: string;
  email: string;
  password: string;
};

const userShcema = new mongoose.Schema<userT>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model("User", userShcema);
export default userModel;
