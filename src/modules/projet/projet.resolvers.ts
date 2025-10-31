import { GraphQLContext } from "@graphql/context";
import { projetService } from "./projet.service";
import { requireAuth, requireAdmin } from "@graphql/context";
import { mongooseToGraphql } from "@shared/utils/enum-mapper";

export const projetResolvers = {
  Query: {
    getProjets: async (_: any, { userId, featured }: any) => {
      return projetService.getProjets({ userId, featured });
    },

    getProjet: async (_: any, { id }: any) => {
      return projetService.getProjetById(id);
    },
  },

  Mutation: {
    createProjet: async (_: any, { input }: any, context: GraphQLContext) => {
      requireAuth(context);
      return projetService.createProjet(context.user!.userId, input);
    },

    updateProjet: async (
      _: any,
      { id, input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const projet = await projetService.getProjetById(id);

      if (!projet) {
        throw new Error("Projet not found");
      }

      if (
        projet.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only update your own projects");
      }

      return projetService.updateProjet(id, input);
    },

    deleteProjet: async (_: any, { id }: any, context: GraphQLContext) => {
      requireAuth(context);

      const projet = await projetService.getProjetById(id);

      if (!projet) {
        throw new Error("Projet not found");
      }

      if (
        projet.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only delete your own projects");
      }

      return projetService.deleteProjet(id);
    },
  },

  Projet: {
    id: (parent: any) => parent._id.toString(),
    userId: (parent: any) => parent.userId.toString(),
    status: (parent: any) => {
      return mongooseToGraphql(parent.status);
    },
  },
};
