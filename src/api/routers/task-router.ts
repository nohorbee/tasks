import express, { Request, Response } from "express";
import { CreateTaskUseCase } from "@domain/use-cases/interfaces/CreateTaskUseCase";
import {
  checkIfAuthenticated,
  checkIfAuthorized,
} from "../middlewares/auth-middleware";
import {
  createTaskValidation,
  jsonPatchSchema,
} from "./validations/task-validation";
import { validate } from "express-validation";
import { Task } from "@domain/entities/task";
import { GetTasksUseCase } from "@domain/use-cases/interfaces/GetTasksUseCase";
import { UpdateTaskUseCase } from "@domain/use-cases/interfaces/UpdateTaskUseCase";

export default function TaskRouter(
  createTaskUseCase: CreateTaskUseCase,
  getTasksUseCase: GetTasksUseCase,
  updateTaskUseCase: UpdateTaskUseCase
) {
  const router = express.Router();

  router.post(
    "/",
    checkIfAuthenticated,
    checkIfAuthorized(["CREATE_TASK"]),
    validate(createTaskValidation),
    async (req: Request, res: Response) => {
      const newTask = req.body as Task;
      newTask.status ??= "TODO";
      newTask.audit ??= {
        createdBy: req.session.userId,
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
      };
      const createdTask = await createTaskUseCase.execute(newTask);

      res.status(201).json({ task: createdTask });
    }
  );

  router.get(
    "/",
    checkIfAuthenticated,
    checkIfAuthorized(["VIEW_OWN_TASKS"]),
    async (req: Request, res: Response) => {
      const newTask = req.body;

      const tasks = await getTasksUseCase.execute(req.session.userId);

      res.status(201).json({ tasks: tasks });
    }
  );

  router.patch(
    "/:taskId",
    checkIfAuthenticated,
    checkIfAuthorized(["UPDATE_TASK"]),
    validate(jsonPatchSchema),
    async (req: Request, res: Response) => {
      const taskId = req.params.taskId;
      const changes = req.body;

      const updatedTask = await updateTaskUseCase.execute(
        taskId,
        changes,
        req.session.userId
      );

      res.status(201).json({ task: updatedTask });
    }
  );

  return router;
}
