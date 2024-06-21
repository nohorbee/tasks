import { Task } from "@domain/entities/task";

export interface CreateTaskUseCase {
  execute(newTask: Task): Promise<Task>;
}
