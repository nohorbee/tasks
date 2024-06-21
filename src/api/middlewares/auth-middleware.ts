import { RedisSessionRepository } from "@data/data-sources/redis/session/redis-session-repository";
import { Permission } from "@domain/entities/user";
import { getAuthToken } from "@lib/auth";
import { AppError } from "@lib/exceptions/app-error";
import logger from "@lib/logger";
import { NextFunction, Request, Response } from "express";
import status from "http-status";

export const checkIfAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionRepository = new RedisSessionRepository();
    const authToken = getAuthToken(req.headers.authorization);

    const session = await sessionRepository.getSession(authToken);
    if (!session || !session.userId) {
      throw new AppError({
        httpCode: status.UNAUTHORIZED,
        description: "Not a valid user",
      });
    }

    const permissions = await sessionRepository.getPermissions(session.userId);
    session.permissions = permissions as Permission[];
    req.session = session;

    return next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

export const checkIfAuthorized = (requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { permissions } = req.session;

    const allIncluded = requiredPermissions?.every((permission) =>
      permissions.includes(permission)
    );
    if (!allIncluded) {
      throw new AppError({
        httpCode: status.UNAUTHORIZED,
        description: "Not enough privileges",
      });
    }

    return next();
  };
};
