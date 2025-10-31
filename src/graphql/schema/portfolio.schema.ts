import { gql } from "apollo-server-express";

export const portfolioTypeDefs = gql`
  type Portfolio {
    profil: Profil
    projets: [Projet!]!
    experiences: [Experience!]!
    competences: [Competence!]!
    educations: [Education!]!
  }

  extend type Query {
    getPortfolio(userId: ID): Portfolio!
  }
`;
