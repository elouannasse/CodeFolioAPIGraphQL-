import { AuthenticationError, AuthorizationError } from "@shared/errors";
import { JwtHelper, JwtPayload } from "@shared/utils";

export interface GraphQLContext {
  user: JwtPayload | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const createContext = ({ req }: any): GraphQLContext => {
  const authHeader = req.headers.authorization;
  const token = JwtHelper.extractTokenFromHeader(authHeader);

  if (!token) {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  try {
    const user = JwtHelper.verifyToken(token);
    return {
      user,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
    };
  } catch (error) {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    };
  }
};

export const requireAuth = (context: GraphQLContext): void => {
  if (!context.isAuthenticated || !context.user) {
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );
  }
};

export const requireAdmin = (context: GraphQLContext): void => {
  requireAuth(context);

  if (!context.isAdmin) {
    throw new AuthorizationError("You must be an admin to perform this action");
  }
};

export const isOwner = (
  context: GraphQLContext,
  resourceUserId: string
): boolean => {
  if (!context.user) return false;
  return context.user.userId === resourceUserId;
};

export const requireOwnerOrAdmin = (
  context: GraphQLContext,
  resourceUserId: string
): void => {
  requireAuth(context);

  if (!context.isAdmin && !isOwner(context, resourceUserId)) {
    throw new AuthorizationError("You can only modify your own resources");
  }
};
