import path from "path";

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

interface IEnvironment {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string | number;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  logLevel: string;
  adminUsername: string;
  adminPassword: string;
  adminEmail: string;
}

class Environment {
  public readonly config: IEnvironment;

  constructor() {
    this.config = {
      port: parseInt(process.env.PORT || "4000", 10),
      nodeEnv: process.env.NODE_ENV || "development",
      mongoUri:
        process.env.MONGODB_URI || "mongodb://localhost:27017/codefolio",
      jwtSecret: process.env.JWT_SECRET || "default-secret-change-me",
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
      rateLimitWindowMs: parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || "900000",
        10
      ),
      rateLimitMaxRequests: parseInt(
        process.env.RATE_LIMIT_MAX_REQUESTS || "100",
        10
      ),
      logLevel: process.env.LOG_LEVEL || "info",
      adminUsername: process.env.ADMIN_USERNAME || "admin",
      adminPassword: process.env.ADMIN_PASSWORD || "Admin@123",
      adminEmail: process.env.ADMIN_EMAIL || "admin@portfolio.com",
    };

    this.validateConfig();
  }

  private validateConfig(): void {
    const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI"];
    const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0 && this.config.nodeEnv === "production") {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`
      );
    }
  }
}

export const env = new Environment().config;
