import { Task } from "@domain/entities/task";
import { TaskRepository } from "@domain/repositories/interfaces/task-repository";
import { UpdateTaskUseCase } from "./interfaces/UpdateTaskUseCase";
import { JsonPatch } from "@lib/types/json-patch";
import { AppError } from "@lib/exceptions/app-error";
import httpStatus from "http-status";
import jsonpatch from "jsonpatch";

export class UpdateTask implements UpdateTaskUseCase {
  taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }
  async execute(
    taskId: string,
    changes: JsonPatch,
    userId: string
  ): Promise<Task> {
    const originalTask = await this.taskRepository.getTask(taskId, userId);
    if (!originalTask) {
      throw new AppError({
        description: "Task not found",
        httpCode: httpStatus.NOT_FOUND,
      });
    }

    try {
      if (changes.length > 0) {
        changes.push({
          op: "replace",
          path: "/audit/lastUpdatedAt",
          value: new Date(),
        });
      }

      const modifiedTask = jsonpatch.apply_patch(originalTask, changes);
      await this.taskRepository.updateTask(modifiedTask);
      return modifiedTask;
    } catch (error) {
      throw new AppError({
        description: "Invalid patch",
        httpCode: httpStatus.BAD_REQUEST,
      });
    }
  }
}
