import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

////----- Message Schema -----////

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

////----- User Schema -----////

export interface User extends Document {
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  messages: Message[];
  comparePassword?: (candidate: string) => Promise<boolean>;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    messages: {
      type: [MessageSchema], // embedded subdocuments
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Optional: pre-save hook to hash password if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err as any);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const MessageModel = model<Message>("Message", MessageSchema);
export const UserModel = model<User>("User", UserSchema);
