import { gql } from "apollo-server";

export const schema = gql`
  type Query
  type Mutation
  scalar DateTime
  type NestedUser {
    userId: String!
    nickname: String!
    isAdmin: Boolean!
  }
`;
