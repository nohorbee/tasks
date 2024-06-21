import { Task } from "@domain/entities/task";

export interface GetTasksUseCase {
  execute(userId: string): Promise<Task[]>;
}
