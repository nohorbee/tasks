import { Task } from "@domain/entities/task";

export interface TaskRepository {
  createTask(task: Task): Promise<Task>;
  getTasks(userId: string): Promise<Task[]>;
  getTask(taskId: string, userId: string): Promise<Task | undefined>;
  updateTask(task: Task): Promise<Task>;
}
