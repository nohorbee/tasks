import { ObjectId } from "mongodb";

import { mongoDB } from "@config/mongodb-config";
import { DataBaseWrapper } from "@data/data-sources/mongodb/mongo-database-wrapper";

const tasksCollection = "tasks";

export const tasksDatabase: DataBaseWrapper = {
  find: (query) =>
    mongoDB.getDb().collection(tasksCollection).find(query).toArray(),
  insertOne: (doc) =>
    mongoDB.getDb().collection(tasksCollection).insertOne(doc),
  findById: (id) =>
    mongoDB
      .getDb()
      .collection(tasksCollection)
      .findOne({ _id: new ObjectId(id) }),
  update: (id, query) =>
    mongoDB
      .getDb()
      .collection(tasksCollection)
      .updateOne({ _id: new ObjectId(id) }, query),
  updateMany: (filter, query, options) =>
    mongoDB
      .getDb()
      .collection(tasksCollection)
      .updateMany(filter, query, options),
  replace: (filter, replacement) =>
    mongoDB.getDb().collection(tasksCollection).replaceOne(filter, replacement),
  aggregate: (stages) =>
    mongoDB.getDb().collection(tasksCollection).aggregate(stages).toArray(),
  insertMany: (docs) =>
    mongoDB.getDb().collection(tasksCollection).insertMany(docs),
};
