import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../models";

@ObjectType()
export class UserTokens {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field((returns) => User)
  user!: User;
}
