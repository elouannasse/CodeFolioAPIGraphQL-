import { gql } from "apollo-server-express";

export const profilTypeDefs = gql`
  type Social {
    platform: String!
    url: String!
    icon: String
  }

  type Profil {
    id: ID!
    userId: ID
    fullName: String!
    title: String!
    bio: String!
    avatar: String
    email: String!
    phone: String
    address: String
    city: String
    postalCode: String
    country: String
    linkedin: String
    github: String
    website: String
    socials: [Social!]
    resume: String
    createdAt: String!
    updatedAt: String!
  }

  input SocialInput {
    platform: String!
    url: String!
    icon: String
  }

  input CreateProfilInput {
    fullName: String!
    title: String!
    bio: String!
    avatar: String
    email: String!
    phone: String
    address: String
    city: String
    postalCode: String
    country: String
    linkedin: String
    github: String
    website: String
    socials: [SocialInput!]
    resume: String
  }

  input UpdateProfilInput {
    fullName: String
    title: String
    bio: String
    avatar: String
    email: String
    phone: String
    address: String
    city: String
    postalCode: String
    country: String
    linkedin: String
    github: String
    website: String
    socials: [SocialInput!]
    resume: String
  }

  extend type Query {
    getProfil(userId: ID): Profil
    getMyProfil: Profil
  }

  extend type Mutation {
    createProfil(input: CreateProfilInput!): Profil!
    updateProfil(id: ID!, input: UpdateProfilInput!): Profil!
    deleteProfil(id: ID!): Boolean!
  }
`;
