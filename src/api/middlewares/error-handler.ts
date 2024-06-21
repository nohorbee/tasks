import { Response } from "express";
import status from "http-status";

import { AppError } from "@lib/exceptions/app-error";
import logger from "@lib/logger";
import { ValidationError } from "express-validation";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    return error instanceof AppError;
  }

  public handleError(error: Error | AppError, response: Response): void {
    if (this.isTrustedError(error)) {
      this.handleTrustedError(error as AppError, response);
    } else if (error instanceof ValidationError) {
      this.handleValidationError(error, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: AppError, response: Response): void {
    logger.error(error);
    response.status(error.httpCode).send({ message: error.message });
  }

  private handleCriticalError(
    error: Error | AppError,
    response: Response
  ): void {
    logger.error(error);
    response
      .status(status.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal server error" });
  }

  private handleValidationError(
    error: ValidationError,
    response: Response
  ): void {
    logger.error(error);
    response.status(error.statusCode).json(error);
  }
}

export const errorHandler = new ErrorHandler();
