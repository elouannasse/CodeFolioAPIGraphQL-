import { GraphQLContext } from "@graphql/context";
import { profilService } from "./profil.service";
import { requireAuth, requireAdmin } from "@graphql/context";

export const profilResolvers = {
  Query: {
    getProfil: async (_: any, { userId }: any, context: GraphQLContext) => {
      const targetUserId = userId || context.user?.userId;

      if (!targetUserId) {
        return null;
      }

      return profilService.getProfilByUserId(targetUserId);
    },

    getMyProfil: async (_: any, __: any, context: GraphQLContext) => {
      requireAuth(context);
      return profilService.getProfilByUserId(context.user!.userId);
    },
  },

  Mutation: {
    createProfil: async (_: any, { input }: any, context: GraphQLContext) => {
      requireAuth(context);
      return profilService.createProfil(context.user!.userId, input);
    },

    updateProfil: async (
      _: any,
      { id, input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const profil = await profilService.getProfilById(id);

      if (!profil) {
        throw new Error("Profil not found");
      }

      if (
        profil.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only update your own profil");
      }

      return profilService.updateProfil(id, input);
    },

    deleteProfil: async (_: any, { id }: any, context: GraphQLContext) => {
      requireAdmin(context);
      return profilService.deleteProfil(id);
    },
  },

  Profil: {
    id: (parent: any) => parent._id.toString(),
    userId: (parent: any) => parent.userId.toString(),
  },
};
