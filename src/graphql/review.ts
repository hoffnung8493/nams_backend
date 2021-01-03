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
import { mongoose } from "@typegoose/typegoose";

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
    return ReviewModel.find({ chapterNumber, bookNumber }).sort({
      updatedAt: -1,
    });
  }

  @Query(() => [Review])
  async myReviews(@Ctx() { userId }: Context): Promise<Review[]> {
    return ReviewModel.find({ user: userId }).sort({ updatedAt: -1 });
  }

  @Mutation(() => Review)
  async reviewCreate(
    @Arg("bookNumber") bookNumber: number,
    @Arg("chapterNumber") chapterNumber: number,
    @Arg("content") content: string,
    @Ctx() { userId, isAdmin }: Context
  ): Promise<Review> {
    if (!userId) throw new Error("로그인을 해주세요.");
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

  @Mutation(() => Review)
  async reviewUpdate(
    @Arg("reviewId") reviewId: string,
    @Arg("content") content: string,
    @Ctx() { userId, isAdmin }: Context
  ): Promise<Review> {
    if (!userId) throw new Error("로그인을 해주세요.");
    const review = await ReviewModel.findOneAndUpdate(
      {
        _id: reviewId,
        user: userId,
      },
      { content },
      { new: true }
    );
    if (!review) throw new Error("회원님이 작성한 후기가 아닙니다.");
    return review;
  }

  @Mutation(() => Boolean)
  async reviewDelete(
    @Arg("reviewId") reviewId: string,
    @Ctx() { userId, isAdmin }: Context
  ): Promise<Boolean> {
    if (!userId) throw new Error("로그인을 해주세요.");
    const review = await ReviewModel.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });
    if (!review) throw new Error("회원님이 작성한 후기가 아닙니다.");
    return true;
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
