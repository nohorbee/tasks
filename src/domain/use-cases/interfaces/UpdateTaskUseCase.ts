import { Task } from "@domain/entities/task";
import { JsonPatch } from "@lib/types/json-patch";

export interface UpdateTaskUseCase {
  execute(taskId: string, changes: JsonPatch, userId: string): Promise<Task>;
}
