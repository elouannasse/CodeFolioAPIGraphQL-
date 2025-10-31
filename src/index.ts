import "module-alias/register";
import { Server } from "./server";
import { logger } from "@config/logger";

const server = new Server();

server.start().catch((error) => {
  logger.error("Failed to start application:", error);
  process.exit(1);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received");
  await server.stop();
});

process.on("SIGINT", async () => {
  logger.info("SIGINT signal received");
  await server.stop();
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
