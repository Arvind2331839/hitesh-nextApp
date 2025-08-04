import mongoose, { Schema, Document } from "mongoose";

////----- Message Schema -----////
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

////----- User Schema -----////

export interface User extends Document {
  email: string;
  password: String;
  verifyCode: String;
  verifyCodeExpery: Date;
  message: Message[];
}

const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Date,
    required: true,
    default: Date.now,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpery: {
    type: Date,
    required: true,
  },
});
