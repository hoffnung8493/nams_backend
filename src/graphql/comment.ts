import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  Comment,
  CommentModel,
  Review,
  ReviewModel,
  User,
  UserModel,
} from "../models";
import { Context } from "../index";

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(@Arg("reviewId") reviewId: string): Promise<Comment[]> {
    return CommentModel.find({ reviewId });
  }

  @Mutation(() => Comment)
  async commentCreate(
    @Arg("reviewId") reviewId: string,
    @Arg("content") content: string,
    @Ctx() { userId, isAdmin }: Context
  ): Promise<Comment> {
    if (!userId) throw new Error("로그인을 해주세요.");
    const [user, review] = await Promise.all([
      UserModel.findById(userId),
      ReviewModel.findById(reviewId),
    ]);
    if (!user) throw new Error("존재하지 않는 회원정보입니다.");
    if (!review) throw new Error("존재하지 않는 리뷰입니다.");
    const [comment] = await Promise.all([
      new CommentModel({
        reviewId,
        content,
        user,
        isAdmin,
      }).save(),
      ReviewModel.updateOne({ _id: reviewId }, { $inc: { commentCount: 1 } }),
    ]);

    return comment;
  }

  @FieldResolver(() => User)
  async user(@Root() review: Review): Promise<User> {
    //@ts-ignore
    return UserModel.findById(review._doc.user);
  }
}
