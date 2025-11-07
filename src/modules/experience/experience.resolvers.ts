import { GraphQLContext } from "@graphql/context";
import { experienceService } from "./experience.service";
import { requireAuth } from "@graphql/context";
import { mongooseToGraphql } from "@shared/utils/enum-mapper";

export const experienceResolvers = {
  Query: {
    getExperiences: async (_: any, { userId }: any) => {
      return experienceService.getExperiences(userId);
    },

    getExperience: async (_: any, { id }: any) => {
      return experienceService.getExperienceById(id);
    },
  },

  Mutation: {
    createExperience: async (
      _: any,
      { input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);
      return experienceService.createExperience(context.user!.userId, input);
    },

    updateExperience: async (
      _: any,
      { id, input }: any,
      context: GraphQLContext
    ) => {
      requireAuth(context);

      const experience = await experienceService.getExperienceById(id);

      if (!experience) {
        throw new Error("Experience not found");
      }

      if (
        experience.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only update your own experiences");
      }

      return experienceService.updateExperience(id, input);
    },

    deleteExperience: async (_: any, { id }: any, context: GraphQLContext) => {
      requireAuth(context);

      const experience = await experienceService.getExperienceById(id);

      if (!experience) {
        throw new Error("Experience not found");
      }

      if (
        experience.userId.toString() !== context.user!.userId &&
        !context.isAdmin
      ) {
        throw new Error("You can only delete your own experiences");
      }

      return experienceService.deleteExperience(id);
    },
  },

  Experience: {
    id: (parent: any) => parent._id.toString(),
    userId: (parent: any) => (parent.userId ? parent.userId.toString() : null),
    employmentType: (parent: any) => {
      return mongooseToGraphql(parent.employmentType);
    },
  },
};
