import { TaskRepository } from "@domain/repositories/interfaces/task-repository";
import { CreateTaskUseCase } from "./interfaces/CreateTaskUseCase";
import { Task } from "@domain/entities/task";

export class CreateTask implements CreateTaskUseCase {
  taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(newTask: Task): Promise<Task> {
    const createdTask = this.taskRepository.createTask(newTask);

    return createdTask;
  }
}
