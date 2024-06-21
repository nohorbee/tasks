import { Session } from "@domain/entities/session";
import { User } from "@domain/entities/user";
import { SessionRepository } from "@domain/repositories/interfaces/session-repository";
import { hashMD5 } from "@lib/hash";

import { sessionDatabase } from "./session-database-wrapper";

export class RedisSessionRepository implements SessionRepository {
  async deleteSession(token: string): Promise<void> {
    const hashKey = `user:${hashMD5(token)}`;
    sessionDatabase.del(hashKey);
  }

  async createSession(session: Session): Promise<number> {
    const hashKey = `user:${hashMD5(session.token)}`;

    let modifiedCount = 0;
    modifiedCount += await sessionDatabase.hSet(
      hashKey,
      "userId",
      session.userId
    );

    const permissionsKey = `user:${session.userId}:permissions`;
    modifiedCount += await sessionDatabase.sAdd(
      permissionsKey,
      session.permissions
    );

    sessionDatabase.expire(hashKey, 4000);
    sessionDatabase.expire(permissionsKey, 4000);

    return modifiedCount;
  }

  async getPermissions(userId: string): Promise<string[]> {
    const setKey = `user:${userId.toString()}:permissions`;
    return await sessionDatabase.sMembers(setKey);
  }

  async getSession(token: string): Promise<Session> {
    const hashKey = `user:${hashMD5(token)}`;

    const session = await sessionDatabase.hGetAll(hashKey);
    return session as Session;
  }
}
