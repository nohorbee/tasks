import { ObjectId } from "mongodb";

import { Task } from "@domain/entities/task";
import { TaskRepository } from "@domain/repositories/interfaces/task-repository";
import logger from "@lib/logger";

import { tasksDatabase } from "./task-database-wrapper";

export class MongoDBTaskRepository implements TaskRepository {
  updateTask(task: Task): Promise<Task> {
    try {
      return tasksDatabase.replace({ _id: task._id }, task);
    } catch (error) {
      logger.error(error);
      throw new Error("Error updating task");
    }
  }
  async getTask(taskId: string, userId: string): Promise<Task | undefined> {
    try {
      const matchingTasks = await tasksDatabase.find({
        _id: new ObjectId(taskId),
        "audit.createdBy": userId,
      });
      return matchingTasks?.at(0);
    } catch (error) {
      logger.error(error);
      throw new Error("Error getting the task");
    }
  }
  async getTasks(userId: string): Promise<Task[]> {
    try {
      return await tasksDatabase.find({ "audit.createdBy": userId });
    } catch (error) {
      logger.error(error);
      throw new Error("Error getting tasks");
    }
  }
  async createTask(task: Task): Promise<Task> {
    try {
      const { insertedId } = await tasksDatabase.insertOne(task);
      return { ...task, _id: insertedId };
    } catch (error) {
      logger.error(error);
      throw new Error("Error creating task");
    }
  }
}
