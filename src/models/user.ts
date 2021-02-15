import { Document, Schema, model, Model, Types } from "mongoose";

export interface UserDoc extends Document {
  email: string;
  nickname: string;
  password: string;
  version: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDoc> {}

export const UserSchema = new Schema(
  {
    email: { required: true, type: String },
    nickname: { required: true, type: String },
    password: { required: true, type: String },
    version: { required: true, type: Number, default: 0 },
    isAdmin: { required: true, type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<UserDoc, UserModel>("User", UserSchema);
