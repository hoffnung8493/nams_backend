import { gql } from "apollo-server";

export const schema = gql`
  type Review {
    bookNumber: Int!
    chapterNumber: Int!
    commentCount: Int!
    comments: [Comment!]!
    content: String!
    createdAt: DateTime!
    id: ID!
    updatedAt: DateTime!
    user: NestedUser!
    likeCount: Int!
    likes: [String!]!
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
