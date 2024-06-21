import { CreateTask } from "./CreateTask";

import { taskRepository } from "@domain/repositories";
import { GetTasks } from "./GetTasks";
import { UpdateTask } from "./UpdateTaskUseCase";

const createTaskUseCase = new CreateTask(taskRepository);
const getTasksUseCase = new GetTasks(taskRepository);
const updateTaskUseCase = new UpdateTask(taskRepository);

export { createTaskUseCase, getTasksUseCase, updateTaskUseCase };
