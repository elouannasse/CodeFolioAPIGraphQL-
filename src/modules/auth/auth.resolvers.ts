import { GraphQLContext } from "@graphql/context";
import { authService } from "./auth.service";
import { requireAuth } from "@graphql/context";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: GraphQLContext) => {
      requireAuth(context);
      return authService.getUserById(context.user!.userId);
    },
  },

  Mutation: {
    login: async (_: any, { input }: any) => {
      const { email, password } = input;
      const result = await authService.login(email, password);

      return {
        token: result.token,
        user: result.user,
      };
    },

    logout: async () => {
      return true;
    },
  },

  User: {
    id: (parent: any) => parent._id.toString(),
  },
};
