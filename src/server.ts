import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@config/environment";
import { database } from "@config/database";
import { logger } from "@config/logger";
import { schema } from "@graphql/schema";
import { createContext } from "@graphql/context";
import { AppError } from "@shared/errors";

export class Server {
  private app: Application;
  private apolloServer: ApolloServer;

  constructor() {
    this.app = express();
    this.apolloServer = new ApolloServer({
      schema,
      context: createContext,
      formatError: (error) => {
        logger.error("GraphQL Error:", error);

        if (error.originalError instanceof AppError) {
          return {
            message: error.message,
            code: error.originalError.code,
            statusCode: error.originalError.statusCode,
          };
        }

        if (env.nodeEnv === "production") {
          return {
            message: "Internal server error",
            code: "INTERNAL_SERVER_ERROR",
          };
        }

        return error;
      },
      introspection: env.nodeEnv !== "production",
    });
  }

  private configureMiddleware(): void {
    this.app.use(
      helmet({
        contentSecurityPolicy: env.nodeEnv === "production" ? undefined : false,
        crossOriginEmbedderPolicy: false,
      })
    );

    this.app.use(
      cors({
        origin:
          env.nodeEnv === "production"
            ? process.env.ALLOWED_ORIGINS?.split(",")
            : "*",
        credentials: true,
      })
    );

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    if (env.nodeEnv !== "test") {
      this.app.use(
        morgan("combined", {
          stream: { write: (message) => logger.info(message.trim()) },
        })
      );
    }
  }

  private configureRoutes(): void {
    this.app.get("/health", (_req, res) => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.nodeEnv,
      });
    });

    this.app.get("/", (_req, res) => {
      res.json({
        name: "Portfolio GraphQL API",
        version: "1.0.0",
        graphql: "/graphql",
        health: "/health",
      });
    });
  }

  async start(): Promise<void> {
    try {
      await database.connect();

      this.configureMiddleware();

      await this.apolloServer.start();

      this.apolloServer.applyMiddleware({
        app: this.app as any,
        path: "/graphql",
        cors: false,
      });

      this.configureRoutes();

      // Start listening
      this.app.listen(env.port, () => {
        logger.info(` Server ready at http://localhost:${env.port}`);
        logger.info(` GraphQL endpoint: http://localhost:${env.port}/graphql`);
        logger.info(`  check: http://localhost:${env.port}/health`);
        logger.info(` Environment: ${env.nodeEnv}`);
      });
    } catch (error) {
      logger.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    logger.info("Shutting down server...");
    await this.apolloServer.stop();
    await database.disconnect();
    process.exit(0);
  }
}
