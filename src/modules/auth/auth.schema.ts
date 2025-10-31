import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum UserRole {
    admin
    visitor
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
  }
`;
