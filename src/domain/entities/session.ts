import { Permission } from "@domain/entities/user";

export interface Session {
  userId: string;
  token: string;
  permissions: Permission[];
}
