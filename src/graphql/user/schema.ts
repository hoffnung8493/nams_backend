import { gql } from "apollo-server";

export const schema = gql`
  type User {
    id: ID!
    email: String!
    nickname: String!
    version: Int!
    isAdmin: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserTokens {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
  extend type Mutation {
    login(email: String!, password: String!): UserTokens!

    signup(email: String!, nickname: String!, password: String!): UserTokens!
  }

  extend type Query {
    me: User
    user(id: String!): User!
    users: [User!]!
  }
`;
