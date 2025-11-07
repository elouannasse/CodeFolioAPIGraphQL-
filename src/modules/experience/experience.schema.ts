import { gql } from "apollo-server-express";

export const experienceTypeDefs = gql`
  type Experience {
    id: ID!
    userId: ID
    company: String!
    position: String!
    description: String!
    location: String
    employmentType: EmploymentType!
    startDate: String!
    endDate: String
    isCurrent: Boolean!
    technologies: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  enum EmploymentType {
    full_time
    part_time
    contract
    freelance
    internship
  }

  input CreateExperienceInput {
    company: String!
    position: String!
    description: String!
    location: String
    employmentType: EmploymentType!
    startDate: String!
    endDate: String
    isCurrent: Boolean
    technologies: [String!]
  }

  input UpdateExperienceInput {
    company: String
    position: String
    description: String
    location: String
    employmentType: EmploymentType
    startDate: String
    endDate: String
    isCurrent: Boolean
    technologies: [String!]
  }

  extend type Query {
    getExperiences(userId: ID): [Experience!]!
    getExperience(id: ID!): Experience
  }

  extend type Mutation {
    createExperience(input: CreateExperienceInput!): Experience!
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience!
    deleteExperience(id: ID!): Boolean!
  }
`;
