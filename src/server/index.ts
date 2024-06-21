import cors from "cors";
import express, { Express } from "express";

const server: Express = express();

export const configureBasicMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use(cors());
};

export default server;
