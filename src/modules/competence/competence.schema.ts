import { gql } from "apollo-server-express";

export const competenceTypeDefs = gql`
  type Competence {
    id: ID!
    userId: ID
    name: String!
    category: CompetenceCategory!
    level: CompetenceLevel!
    icon: String
    yearsOfExperience: Int
    description: String
    createdAt: String!
    updatedAt: String!
  }

  enum CompetenceCategory {
    programming_language
    framework
    database
    tool
    soft_skill
    methodology
    cloud
    devops
    design
    other
  }

  enum CompetenceLevel {
    beginner
    intermediate
    advanced
    expert
  }

  input CreateCompetenceInput {
    name: String!
    category: CompetenceCategory!
    level: CompetenceLevel!
    icon: String
    yearsOfExperience: Int
    description: String
  }

  input UpdateCompetenceInput {
    name: String
    category: CompetenceCategory
    level: CompetenceLevel
    icon: String
    yearsOfExperience: Int
    description: String
  }

  extend type Query {
    getCompetences(userId: ID, category: CompetenceCategory): [Competence!]!
    getCompetence(id: ID!): Competence
  }

  extend type Mutation {
    createCompetence(input: CreateCompetenceInput!): Competence!
    updateCompetence(id: ID!, input: UpdateCompetenceInput!): Competence!
    deleteCompetence(id: ID!): Boolean!
  }
`;
