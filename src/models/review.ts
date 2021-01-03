import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./index";

@index({ bookId: 1, chapterId: 1 })
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
class Review {
  @Field(() => ID)
  public id!: string;

  @Field(() => Int)
  @prop({ required: true })
  public bookNumber!: number;

  @Field(() => Int)
  @prop({ required: true })
  public chapterNumber!: number;

  @Field()
  @prop({ required: true })
  public content!: string;

  @Field((type) => User)
  @prop({ required: true, ref: "User" })
  public user!: Ref<User>;

  @Field()
  @prop({ default: false })
  public isAdmin?: boolean;

  @Field(() => Int)
  @prop({ default: 0 })
  public commentCount!: number;

  @Field()
  public createdAt?: Date;

  @Field()
  public updatedAt?: Date;
}

const ReviewModel = getModelForClass(Review);

export { ReviewModel, Review };
