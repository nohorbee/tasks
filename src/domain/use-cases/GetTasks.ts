import { TaskRepository } from "@domain/repositories/interfaces/task-repository";
import { CreateTaskUseCase } from "./interfaces/CreateTaskUseCase";
import { Task } from "@domain/entities/task";
import { GetTasksUseCase } from "./interfaces/GetTasksUseCase";

export class GetTasks implements GetTasksUseCase {
  taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId: string): Promise<Task[]> {
    const tasks = this.taskRepository.getTasks(userId);

    return tasks;
  }
}
