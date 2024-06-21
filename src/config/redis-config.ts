import dotenv from "dotenv";
import * as redis from "redis";
import { RedisClientType } from "redis";

import logger, { unMaskIfDev } from "@lib/logger";

dotenv.config();

let client: RedisClientType;

export const redisDB = {
  connectToServer: function () {
    logger.info("connecting to redis ");

    const url = process.env.REDIS_URL || "redis://redis:6379";
    const password = process.env.REDIS_PASSWORD;
    logger.info(`Redis host: ${url}`);
    logger.info(`Redis pass: ${unMaskIfDev(password)}`);
    client = redis.createClient({
      url,
      password,
    });

    client.on("error", (err) => console.error("client error", err));
    client.on("connect", () => console.log("client is connect"));
    client.on("reconnecting", () => console.log("client is reconnecting"));
    client.on("ready", () => console.log("client is ready"));

    client.connect();
  },
  getClient: function () {
    return client;
  },
  disconnect: function () {
    logger.info("Closing redis connection");
    client.disconnect();
  },
};
