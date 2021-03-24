import { gql } from "apollo-server";

export const schema = gql`
  type User {
    id: ID!
    email: String!
    nickname: String!
    version: Int!
    isAdmin: Boolean!
    formResult: [Int!]!
    peerReviews: [PeerReview!]!
    myScore: Int!
    peerReviewCount: Int!
    averageScore: Int!
    myScoreTopPercent: Int!
    peerScoreTopPercent: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PeerReview {
    userId: String!
    formResult: [Int!]!
    createdAt: DateTime!
  }

  type UserTokens {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
  extend type Mutation {
    login(email: String!, password: String!): UserTokens!
    signup(email: String!, nickname: String!, password: String!): UserTokens!
    doMyForm(formResult: [Int!]!): User!
    doPeerForm(peerId: String!, formResult: [Int!]!): Boolean!
    resetMyForm: User!
  }

  extend type Query {
    me: User
    user(id: String!): User!
    users: [User!]!
  }
`;
