import { QueryResolvers, MutationResolvers } from "../__generatedTypes__";
import { Comment, Review, User } from "../../models";
import _ from "lodash";

export const resolvers: {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
} = {
  Query: {
    comments: async (_, { reviewId }) => {
      let comments = await Comment.find({ reviewId });
      return comments;
    },
  },
  Mutation: {
    commentCreate: async (
      _,
      { reviewId, content },
      { userId, nickname, isAdmin }
    ) => {
      if (!userId) throw new Error("로그인을 해주세요.");
      const review = await Review.findById(reviewId);
      if (!review) throw new Error("존재하지 않는 리뷰입니다.");
      let comment = new Comment({
        reviewId,
        content,
        user: { userId, nickname, isAdmin },
      });
      await Promise.all([
        comment.save(),
        Review.updateOne(
          { _id: reviewId },
          { $push: { comments: comment }, $inc: { commentCount: 1 } }
        ),
      ]);
      return comment;
    },
    commentUpdate: async (_, { id, content }, { userId }) => {
      const [comment] = await Promise.all([
        Comment.findOneAndUpdate(
          { _id: id, "user.userId": userId },
          { content },
          { new: true }
        ),
        Review.updateOne(
          { "comments._id": id },
          { "comments.$.content": content }
        ),
      ]);
      if (!comment) throw new Error("권한이 없습니다.");
      return comment;
    },
    commentDelete: async (_, { id }, { userId, isAdmin }) => {
      let comment = await Comment.findById(id);
      if (!comment) throw new Error("존재하지 않는 댓글입니다.");
      if (!isAdmin && comment.user.userId.toString() !== userId)
        throw new Error("삭제 권한이 없습니다.");

      await Promise.all([
        Comment.deleteOne({ _id: id }),
        Review.updateOne(
          { "comments._id": id },
          { $pull: { comments: { _id: id } }, $inc: { commentCount: -1 } }
        ),
      ]);

      return true;
    },
    commentLike: async (_, { id }, { userId }) => {
      const comment = await Comment.findOneAndUpdate(
        { _id: id, likes: { $ne: userId } },
        { $inc: { likeCount: 1 }, $push: { likes: userId } },
        { new: true }
      );
      if (!comment)
        throw new Error("댓글이 존재하지 않거나 이미 좋아요를 하셨습니다..");
      return comment;
    },
    commentLikeCancel: async (_, { id }, { userId }) => {
      const comment = await Comment.findOneAndUpdate(
        { _id: id, likes: userId },
        { $inc: { likeCount: -1 }, $pull: { likes: userId } },
        { new: true }
      );
      if (!comment)
        throw new Error(
          "댓글이 존재하지 않거나 이미 좋아요를 취소하셨습니다.."
        );
      return comment;
    },
  },
};
