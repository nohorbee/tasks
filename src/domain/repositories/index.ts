import { MongoDBTaskRepository } from "@data/data-sources/mongodb/task/mongodb-task-repository";

const taskRepository = new MongoDBTaskRepository();

export { taskRepository };
