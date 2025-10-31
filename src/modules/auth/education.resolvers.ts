import { GraphQLContext } from "@graphql/context";
import { educationService } from "./education.service";
import { requireAuth } from "@graphql/context";

export const educationResolvers = {
  Query: {
    getEducations: async (_: any, { userId }: any) => {
      return educationService.getEducations(userId);
    },

    getEducation: async (_: any, { id }: any) => {
      return educationService.getEducationById(id);
    },
  },

  Mutation: {
    createEducation: async (
      _: any,
      { input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return educationService.createEducation(context.user!.userId, input);
    },

    updateEducation: async (
      _: any,
      { id, input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const education = await educationService.getEducationById(id);

      if (!education) {
        throw new Error("Education not found");
      }

      if (
        education.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only update your own educations");
      }

      return educationService.updateEducation(id, input);
    },

    deleteEducation: async (_: any, { id }: any, context: GraphQLContext) => {
      requireAuth(context);

      const education = await educationService.getEducationById(id);

      if (!education) {
        throw new Error("Education not found");
      }

      if (
        education.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only delete your own educations");
      }

      return educationService.deleteEducation(id);
    },
  },

  Education: {
    id: (parent: any) => parent._id.toString(),
    userId: (parent: any) => parent.userId.toString(),
  },
};
