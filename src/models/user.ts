import { Document, Schema, model, Model, Types } from "mongoose";

export interface UserDoc extends Document {
  email: string;
  nickname: string;
  password: string;
  version: number;
  isAdmin: boolean;
  formResult: number[];
  peerReviews: { formResult: number[]; createdAt: Date }[];
  myScore: number;
  averageScore: number;
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
    formResult: [{ type: Number, required: true }],
    peerReviews: [
      {
        formResult: [{ type: Number, required: true }],
        createdAt: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

UserSchema.virtual("myScore").get(function () {
  //@ts-ignore
  let me: UserDoc = this;
  return me.formResult.reduce((a, c) => a + c, 0);
});

UserSchema.virtual("peerReviewCount").get(function () {
  //@ts-ignore
  let me: UserDoc = this;
  return me.peerReviews.length;
});

UserSchema.virtual("averageScore").get(function () {
  //@ts-ignore
  let me: UserDoc = this;
  if (me.peerReviews.length === 0) return 0;
  return Math.ceil(
    me.peerReviews
      .map((v) => v.formResult.reduce((a, c) => a + c, 0))
      .reduce((a, c) => a + c, 0) / me.peerReviews.length
  );
});

export const User = model<UserDoc, UserModel>("User", UserSchema);
