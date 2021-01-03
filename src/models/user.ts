import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @Field(() => ID)
  public id?: string;

  @Field()
  @prop({ required: true, unique: true })
  public email!: string;

  @Field()
  @prop({ required: true, unique: true })
  public nickname!: string;

  @prop({ required: true })
  public password!: string;

  @Field(() => Int)
  @prop({ required: true, default: 0 })
  public version!: number;

  @Field()
  @prop({ required: true, default: false })
  public isAdmin!: boolean;
}

const UserModel = getModelForClass(User);

export { UserModel, User };
