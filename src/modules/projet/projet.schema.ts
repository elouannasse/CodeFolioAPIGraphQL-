import { gql } from "apollo-server-express";

export const projetTypeDefs = gql`
  type Projet {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    image: String
    technologies: [String!]!
    demoUrl: String
    githubUrl: String
    category: ProjectCategory!
    featured: Boolean!
    startDate: String
    endDate: String
    status: ProjectStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum ProjectCategory {
    web
    mobile
    desktop
    backend
    fullstack
    other
  }

  enum ProjectStatus {
    completed
    in_progress
    planned
  }

  input CreateProjetInput {
    title: String!
    description: String!
    image: String
    technologies: [String!]!
    demoUrl: String
    githubUrl: String
    category: ProjectCategory!
    featured: Boolean
    startDate: String
    endDate: String
    status: ProjectStatus
  }

  input UpdateProjetInput {
    title: String
    description: String
    image: String
    technologies: [String!]
    demoUrl: String
    githubUrl: String
    category: ProjectCategory
    featured: Boolean
    startDate: String
    endDate: String
    status: ProjectStatus
  }

  extend type Query {
    getProjets(userId: ID, featured: Boolean): [Projet!]!
    getProjet(id: ID!): Projet
  }

  extend type Mutation {
    createProjet(input: CreateProjetInput!): Projet!
    updateProjet(id: ID!, input: UpdateProjetInput!): Projet!
    deleteProjet(id: ID!): Boolean!
  }
`;
