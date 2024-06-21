export interface User {
  _id: string;
  email: string;
  name: string;
  permissions: Permission[];
}

export type Permission = "VIEW_OWN_TASKS" | "CREATE_TASK" | "UPDATE_TASK";
