import { gql } from "apollo-server";

export const schema = gql`
  type Comment {
    id: ID!
    reviewId: String!
    content: String!
    user: NestedUser!
    likeCount: Int!
    likes: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    commentCreate(content: String!, reviewId: String!): Comment!
    commentUpdate(id: String!, content: String!): Comment!
    commentDelete(id: String!): Boolean!
    commentLike(id: String!): Comment!
    commentLikeCancel(id: String!): Comment!
  }

  extend type Query {
    comments(reviewId: String!): [Comment!]!
  }
`;
