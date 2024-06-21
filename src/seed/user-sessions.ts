import { RedisSessionRepository } from "@data/data-sources/redis/session/redis-session-repository";
import { User } from "@domain/entities/user";

export function seedSessions() {
  if (process.env.NODE_ENV === "development") {
    const mockUsers: User[] = [
      {
        _id: "canwriteandview",
        email: "test1@every.io",
        name: "Test User 1",
        permissions: ["CREATE_TASK", "VIEW_OWN_TASKS", "UPDATE_TASK"],
      },
      {
        _id: "cantviewowntasks",
        email: "test2@every.io",
        name: "Test User 2",
        permissions: ["CREATE_TASK"],
      },
      {
        _id: "couldbutnotlogged",
        email: "test3@every.io",
        name: "Test User 3",
        permissions: ["CREATE_TASK"],
      },
    ];

    const redisSessionRepository = new RedisSessionRepository();

    redisSessionRepository.createSession({
      userId: mockUsers[0]._id,
      token: "asecretokenforuser0",
      permissions: mockUsers[0].permissions,
    });

    redisSessionRepository.createSession({
      userId: mockUsers[1]._id,
      token: "asecretokenforuser1",
      permissions: mockUsers[1].permissions,
    });
  }
}
