import { QueryResolvers, MutationResolvers } from "../__generatedTypes__";
import { Review, User } from "../../models";

export const resolvers: {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
} = {
  Query: {
    review: async (_, { id }) => {
      const review = await Review.findById(id);
      if (!review) throw new Error("존재하지 않는 리뷰입니다.");
      return review;
    },
    reviews: async (_, { bookNumber, chapterNumber }) => {
      return Review.find({ bookNumber, chapterNumber }).sort({ updatedAt: -1 });
    },
    myReviews: async (_, __, { userId }) => {
      return Review.find({ "user.userId": userId }).sort({ updatedAt: -1 });
    },
  },
  Mutation: {
    reviewCreate: async (
      _,
      { bookNumber, chapterNumber, content },
      { userId, nickname, isAdmin }
    ) => {
      if (!userId) throw new Error("로그인을 해주세요.");
      const review = await new Review({
        bookNumber,
        chapterNumber,
        content,
        user: { userId, isAdmin, nickname },
      }).save();
      return review;
    },
    reviewUpdate: async (_, { reviewId, content }, { userId }) => {
      if (!userId) throw new Error("로그인을 해주세요.");
      const review = await Review.findOneAndUpdate(
        {
          _id: reviewId,
          "user.userId": userId,
        },
        { content },
        { new: true }
      );
      if (!review) throw new Error("회원님이 작성한 후기가 아닙니다.");
      return review;
    },
    reviewDelete: async (_, { reviewId }, { userId, isAdmin }) => {
      if (!userId) throw new Error("로그인을 해주세요.");
      await Review.deleteOne({ _id: reviewId, "user.userId": userId });
      if (isAdmin) await Review.deleteOne({ _id: reviewId });
      return true;
    },
    reviewLike: async (_, { id }, { userId }) => {
      const review = await Review.findOneAndUpdate(
        { _id: id, likes: { $ne: userId } },
        { $inc: { likesCount: 1 }, $push: { likes: userId } },
        { new: true }
      );
      if (!review)
        throw new Error("후기가 존재하지 않거나 이미 좋아요를 하셨습니다..");
      return review;
    },
    reviewLikeCancel: async (_, { id }, { userId }) => {
      const review = await Review.findOneAndUpdate(
        { _id: id, likes: userId },
        { $inc: { likesCount: -1 }, $pull: { likes: userId } },
        { new: true }
      );
      if (!review)
        throw new Error(
          "후기가 존재하지 않거나 이미 좋아요를 취소하셨습니다.."
        );
      return review;
    },
  },
};
