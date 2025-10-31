import { GraphQLContext } from "@graphql/context";
import { competenceService } from "./competence.service";
import { requireAuth } from "@graphql/context";
import { mongooseToGraphql } from "@shared/utils/enum-mapper";

export const competenceResolvers = {
  Query: {
    getCompetences: async (_: any, { userId, category }: any) => {
      return competenceService.getCompetences({ userId, category });
    },

    getCompetence: async (_: any, { id }: any) => {
      return competenceService.getCompetenceById(id);
    },
  },

  Mutation: {
    createCompetence: async (
      _: any,
      { input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return competenceService.createCompetence(context.user!.userId, input);
    },

    updateCompetence: async (
      _: any,
      { id, input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const competence = await competenceService.getCompetenceById(id);

      if (!competence) {
        throw new Error("Competence not found");
      }

      if (
        competence.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only update your own competences");
      }

      return competenceService.updateCompetence(id, input);
    },

    deleteCompetence: async (_: any, { id }: any, context: GraphQLContext) => {
      requireAuth(context);

      const competence = await competenceService.getCompetenceById(id);

      if (!competence) {
        throw new Error("Competence not found");
      }

      if (
        competence.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only delete your own competences");
      }

      return competenceService.deleteCompetence(id);
    },
  },

  Competence: {
    id: (parent: any) => parent._id.toString(),
    userId: (parent: any) => parent.userId.toString(),
    category: (parent: any) => {
      return mongooseToGraphql(parent.category);
    },
  },
};
