import { Document, Schema, model, Model, Types } from "mongoose";

export interface CommentDoc extends Document {
  id: string;
  reviewId: string;
  content: string;
  user: {
    userId: string;
    nickname: string;
    isAdmin: boolean;
  };
  likeCount: Number;
  likes: String[];
}

export interface CommentModel extends Model<CommentDoc> {}

export const CommentSchema = new Schema({
  reviewId: { required: true, type: Types.ObjectId },
  content: { required: true, type: String },
  user: { userId: Types.ObjectId, nickname: String, isAdmin: Boolean },
  likeCount: { required: true, type: Number, default: 0 },
  likes: [Types.ObjectId],
});

export const Comment = model<CommentDoc, CommentModel>(
  "Comment",
  CommentSchema
);
