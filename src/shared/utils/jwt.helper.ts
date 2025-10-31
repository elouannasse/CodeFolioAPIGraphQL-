import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "@config/environment";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "visitor";
}

export class JwtHelper {
  static generateToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: env.jwtExpiresIn as any,
    };
    return jwt.sign(payload, env.jwtSecret, options);
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader) return null;

    const parts = authHeader.split(" ");

    if (parts.length === 2 && parts[0] === "Bearer") {
      return parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }

    return null;
  }
}
