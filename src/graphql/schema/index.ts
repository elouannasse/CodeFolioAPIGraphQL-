import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { authTypeDefs } from "@modules/auth/auth.schema";
import { profilTypeDefs } from "@modules/profil/profil.schema";
import { projetTypeDefs } from "@modules/projet/projet.schema";
import { experienceTypeDefs } from "@modules/experience/experience.schema";
import { competenceTypeDefs } from "@modules/competence/competence.schema";
import { educationTypeDefs } from "@modules/auth/education.schema";
import { portfolioTypeDefs } from "./portfolio.schema";

import { authResolvers } from "@modules/auth/auth.resolvers";
import { profilResolvers } from "@modules/profil/profil.resolvers";
import { projetResolvers } from "@modules/projet/projet.resolvers";
import { experienceResolvers } from "@modules/experience/experience.resolvers";
import { competenceResolvers } from "@modules/competence/competence.resolvers";
import { educationResolvers } from "@modules/auth/education.resolvers";
import { portfolioResolvers } from "./portfolio.resolvers";

const typeDefs = mergeTypeDefs([
  authTypeDefs,
  profilTypeDefs,
  projetTypeDefs,
  experienceTypeDefs,
  competenceTypeDefs,
  educationTypeDefs,
  portfolioTypeDefs,
]);

const resolvers = mergeResolvers([
  authResolvers,
  profilResolvers,
  projetResolvers,
  experienceResolvers,
  competenceResolvers,
  educationResolvers,
  portfolioResolvers,
]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
