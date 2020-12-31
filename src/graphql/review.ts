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
  User,
  Review,
  ReviewModel,
  UserModel,
  Comment,
  CommentModel,
} from "../models";
import { Context } from "../index";

@Resolver(() => Review)
export class ReviewResolver {
  @Query(() => Review)
  async review(@Arg("id") id: string): Promise<Review> {
    let review = await ReviewModel.findById(id);
    if (!review) throw new Error("존재하지 않는 리뷰입니다.");
    return review;
  }

  @Query(() => [Review])
  async reviews(
    @Arg("bookNumber") bookNumber: number,
    @Arg("chapterNumber") chapterNumber: number
  ): Promise<Review[]> {
    return ReviewModel.find({ chapterNumber, bookNumber });
  }

  @Mutation(() => Review)
  async reviewCreate(
    @Arg("bookNumber") bookNumber: number,
    @Arg("chapterNumber") chapterNumber: number,
    @Arg("content") content: string,
    @Ctx() { userId, isAdmin }: Context
  ): Promise<Review> {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("존재하지 않는 회원정보입니다.");
    const review = await ReviewModel.create({
      bookNumber,
      chapterNumber,
      content,
      user,
      isAdmin,
      commentCount: 0,
    });
    return review;
  }

  @FieldResolver(() => User)
  async user(@Root() review: Review): Promise<User> {
    //@ts-ignore
    return UserModel.findById(review._doc.user);
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() review: Review): Promise<Comment[]> {
    //@ts-ignore
    return CommentModel.find({ reviewId: review._doc._id });
  }
}
