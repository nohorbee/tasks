import { errorHandler } from "@api/middlewares/error-handler";
import TaskRouter from "@api/routers/task-router";
import { Session } from "@domain/entities/session";
import { Task } from "@domain/entities/task";
import { CreateTaskUseCase } from "@domain/use-cases/interfaces/CreateTaskUseCase";
import { GetTasksUseCase } from "@domain/use-cases/interfaces/GetTasksUseCase";
import { UpdateTaskUseCase } from "@domain/use-cases/interfaces/UpdateTaskUseCase";
import app from "@server/index";
import { NextFunction, Request, Response } from "express";
import request from "supertest";
import { sessionDatabase } from "@data/data-sources/redis/session/session-database-wrapper";
import { hashMD5 } from "@lib/hash";
import { valid } from "joi";

class MockCreateTaskUseCase implements CreateTaskUseCase {
  execute(newTask: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}

class MockGetTasksUseCase implements GetTasksUseCase {
  async execute(userId: string): Promise<Task[]> {
    return [
      {
        _id: "sldfksdf",
        title: "title",
        description: "description",
        status: "TODO",
        audit: {
          createdBy: "user-id",
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
        },
      },
    ];
  }
}

class MockUpdateTaskUseCase implements UpdateTaskUseCase {
  execute(taskId: string, changes: any, userId: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}

describe("Task Router", () => {
  beforeAll(() => {
    app.use(
      "/tasks",
      TaskRouter(
        new MockCreateTaskUseCase(),
        new MockGetTasksUseCase(),
        new MockUpdateTaskUseCase()
      )
    );

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      errorHandler.handleError(err, res);
      next(err);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("@data/data-sources/redis/session/session-database-wrapper");

    const validToken = `user:${hashMD5("valid-token")}`;
    const goodSession: Session = {
      token: validToken,
      userId: "valid-user-id",
      permissions: ["CREATE_TASK", "VIEW_OWN_TASKS", "VIEW_OWN_TASKS"],
    };

    const notPrivilegesToken = `user:${hashMD5("not-privileges-token")}`;
    const notEnoughPrivilegesSession: Session = {
      token: notPrivilegesToken,
      userId: "invalid-user-id",
      permissions: [],
    };

    const sessions = {
      [validToken]: goodSession,
      [notPrivilegesToken]: notEnoughPrivilegesSession,
    };

    sessionDatabase.hGetAll = jest.fn(async (key) => {
      return sessions[key];
    });

    sessionDatabase.sMembers = jest.fn(async (key) => {
      const foundSession = Object.values(sessions).find((session) => {
        return key === `user:${session.userId}:permissions`;
      });

      return foundSession?.permissions || [];
    });
  });

  describe("GET /tasks", () => {
    test("should return 401 because of unauthenticated user", async () => {
      const response = await request(app).get("/tasks");
      expect(response.status).toBe(401);
    });

    test("should return 401 because the token is invalid", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", "Bearer unexistant-token");

      expect(response.status).toBe(401);
    });

    test("should return 401 because the token is invalid", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", "Bearer not-privileges-token");

      expect(response.status).toBe(401);
    });

    test("should return 201 and the tasks", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", "Bearer valid-token");
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("tasks");
    });
  });
});
