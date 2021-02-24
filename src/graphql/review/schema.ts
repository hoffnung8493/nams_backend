import { gql } from "apollo-server";

export const schema = gql`
  type Review {
    id: ID!
    bookNumber: Int!
    chapterNumber: Int!
    user: NestedUser!
    content: String!
    comments: [Comment!]!
    commentCount: Int!
    likes: [String!]!
    likeCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    reviewCreate(
      bookNumber: Float!
      chapterNumber: Float!
      content: String!
    ): Review!
    reviewUpdate(content: String!, reviewId: String!): Review!
    reviewDelete(reviewId: String!): Boolean!
    reviewLike(id: String!): Review!
    reviewLikeCancel(id: String!): Review!
  }

  extend type Query {
    myReviews: [Review!]!
    review(id: String!): Review!
    reviews(bookNumber: Float!, chapterNumber: Float!): [Review!]!
  }
`;
