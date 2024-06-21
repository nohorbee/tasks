import dotenv from "dotenv";

import { mongoDB } from "@config/mongodb-config";
import { redisDB } from "@config/redis-config";
import logger, { requestLogger } from "@lib/logger";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "@api/middlewares/error-handler";
import { setupRouters } from "@api/routers";
import { seedSessions } from "@seed/user-sessions";
import app, { configureBasicMiddlewares } from "@server/index";
import { swaggerConfig, swaggerDocument } from "@config/swagger-config";
import swaggerUi from "swagger-ui-express";

dotenv.config();

mongoDB.connectToServer();
redisDB.connectToServer();
configureBasicMiddlewares(app);

app.use(requestLogger);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerConfig)
);
const routers = setupRouters();
app.use(routers);

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json("Ok");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next(err);
});

const port: number = parseInt(process.env.PORT || "8080");
const server = app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});

seedSessions();
