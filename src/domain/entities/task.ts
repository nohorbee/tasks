import { Audit } from "@domain/entities/audit";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  audit: Audit;
}

export type TaskStatus = "TODO" | "IN PROGRESS" | "DONE" | "ARCHIVED";
