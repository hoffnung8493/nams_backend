import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./index";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
class Comment {
  @Field(() => ID)
  public id!: string;

  @Field()
  @prop({ required: true })
  public reviewId!: string;

  @Field()
  @prop({ required: true })
  public content!: string;

  @Field()
  @prop({ required: true, ref: "User" })
  public user!: User;
}

const CommentModel = getModelForClass(Comment);

export { CommentModel, Comment };
