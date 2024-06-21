import { Router } from "express";
import TaskRouter from "./task-router";

import {
  createTaskUseCase,
  getTasksUseCase,
  updateTaskUseCase,
} from "@domain/use-cases";

const taskRouter = TaskRouter(
  createTaskUseCase,
  getTasksUseCase,
  updateTaskUseCase
);

export function setupRouters(router?: Router) {
  router = router || Router();

  router.use("/tasks", taskRouter);

  return router;
}
