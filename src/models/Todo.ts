import mongoose, { Schema } from "mongoose";

const todoShcema: Schema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    required:false
  }
});

const todoModel = mongoose.model("Todo", todoShcema);
export default todoModel;
