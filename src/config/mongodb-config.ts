import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

import logger from "@lib/logger";
// import { seedDatabase } from "@utils/seed-db";

dotenv.config();
let _db: Db;
let client: MongoClient;

const dbName = process.env.MONGODB_DB_NAME || "TASKS_DB";

export const mongoDB = {
  connectToServer: function () {
    const MONGODB_USER: string | undefined = process.env.MONGODB_USER;
    const MONGODB_PASSWORD: string | undefined = process.env.MONGODB_PASSWORD;
    const MONGODB_HOST: string | undefined = process.env.MONGODB_HOST;
    const protocol: string | undefined = process.env.MONGODB_PROTOCOL;
    let usePort = false;
    if (protocol) {
      usePort = protocol.indexOf("srv") < 0;
    }
    const MONGODB_PORT = usePort ? `:${process.env.MONGODB_PORT}` : "";
    const credentials =
      MONGODB_USER || MONGODB_PASSWORD
        ? `${MONGODB_USER}:${MONGODB_PASSWORD}@`
        : "";
    const uri = `${protocol}://${credentials}${MONGODB_HOST}${MONGODB_PORT}`;

    logger.info("connecting to mongoDB: " + uri);
    client = new MongoClient(uri);
    client.connect();
    _db = client.db(dbName);

    createIndexes(_db);
  },
  disconnect: function () {
    logger.info("Closing mongoDB connection");
    client.close();
  },
  getDb: function () {
    return _db;
  },
};

function createIndexes(db: Db) {
  const tasksCollectionName = "tasks";

  const collection = db.collection(tasksCollectionName);

  collection.createIndex({ "audit.createdBy": 1 });
  collection.createIndex({ _id: 1, "audit.createdBy": 1 });
}
