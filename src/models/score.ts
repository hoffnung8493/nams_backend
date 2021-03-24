import { Document, Schema, model, Model, Types } from "mongoose";

export interface ScoreDoc extends Document {
  id: string;
  self: number[];
  peer: number[];
}

export interface ScoreModel extends Model<ScoreDoc> {}

export const ScoreSchema = new Schema(
  {
    self: [Number],
    peer: [Number],
  },
  { timestamps: true }
);

export const Score = model<ScoreDoc, ScoreModel>("Score", ScoreSchema);
