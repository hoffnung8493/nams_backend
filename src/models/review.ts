import { Document, Schema, model, Model, Types } from "mongoose";
import { CommentDoc, CommentSchema } from "./comment";

export interface ReviewDoc extends Document {
  id: string;
  bookNumber: number;
  chapterNumber: number;
  content: string;
  user: {
    userId: string;
    nickname: string;
    isAdmin: boolean;
  };
  commentCount: number;
  comments: CommentDoc[];
  likeCount: Number;
  likes: String[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewModel extends Model<ReviewDoc> {}

export const ReviewSchema = new Schema(
  {
    bookNumber: { required: true, type: Number },
    chapterNumber: { required: true, type: Number },
    content: { required: true, type: String },
    user: { userId: Types.ObjectId, nickname: String, isAdmin: Boolean },
    commentCount: { required: true, type: Number, default: 0 },
    comments: [CommentSchema],
    likeCount: { required: true, type: Number, default: 0 },
    likes: [Types.ObjectId],
  },
  { timestamps: true }
);

export const Review = model<ReviewDoc, ReviewModel>("Review", ReviewSchema);
