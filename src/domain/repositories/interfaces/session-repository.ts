import { Session } from "@domain/entities/session";

export interface SessionRepository {
  deleteSession(token: string): Promise<void>;
  createSession(session: Session): Promise<number>;
  getPermissions(userId: string, orgId: string): Promise<string[]>;
  getSession(token: string): Promise<Session>;
}
