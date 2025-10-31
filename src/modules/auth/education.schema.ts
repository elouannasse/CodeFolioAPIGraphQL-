import { gql } from "apollo-server-express";

export const educationTypeDefs = gql`
  type Education {
    id: ID!
    userId: ID!
    institution: String!
    degree: String!
    fieldOfStudy: String!
    description: String
    startDate: String!
    endDate: String
    isCurrent: Boolean!
    grade: String
    location: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateEducationInput {
    institution: String!
    degree: String!
    fieldOfStudy: String!
    description: String
    startDate: String!
    endDate: String
    isCurrent: Boolean
    grade: String
    location: String
  }

  input UpdateEducationInput {
    institution: String
    degree: String
    fieldOfStudy: String
    description: String
    startDate: String
    endDate: String
    isCurrent: Boolean
    grade: String
    location: String
  }

  extend type Query {
    getEducations(userId: ID): [Education!]!
    getEducation(id: ID!): Education
  }

  extend type Mutation {
    createEducation(input: CreateEducationInput!): Education!
    updateEducation(id: ID!, input: UpdateEducationInput!): Education!
    deleteEducation(id: ID!): Boolean!
  }
`;
