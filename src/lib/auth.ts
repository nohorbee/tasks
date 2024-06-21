import status from "http-status";

import { AppError } from "@lib/exceptions/app-error";
import logger from "./logger";

export function getAuthToken(header?: string): string {
  if (!header || header.split(" ")[0] !== "Bearer") {
    throw new AppError({
      httpCode: status.UNAUTHORIZED,
      description: "Unauthenticated",
    });
  }
  return header.split(" ")[1];
}
