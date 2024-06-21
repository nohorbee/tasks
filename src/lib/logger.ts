import dotenv from "dotenv";
import { createLogger, format, transport, transports } from "winston";

import { Request, Response, NextFunction } from "express";

dotenv.config();

const loggerTransports: transport[] = [];
if (process.env.NODE_ENV === "production") {
  // ... Implement any final logger such as google-cloud/logging-winston.
  loggerTransports.push(new transports.Console()); // Logging to console for the scope of the challenge
} else {
  loggerTransports.push(new transports.Console());
}

console.log(`LOG LEVEL: ${process.env.LOG_LEVEL}`);

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: loggerTransports,
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.errors({ stack: true }),
    format.splat(),
    format.printf((info: any) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  logger.info(
    `HTTP Request: 
    method=[${req.method}] 
    url=[${req.url}] 
    query=[${JSON.stringify(req.query)}] 
    body=[${JSON.stringify(req.body)}]`
  );
  res.on("finish", () => {
    const responseTime = Date.now() - start;
    logger.info(
      `HTTP Response: 
      status=[${res.statusCode}] 
      responseTime=[${responseTime}]`
    );
  });
  next();
};

export const unMaskIfDev = (message?: string) => {
  if (process.env.NODE_ENV === "development") {
    return message;
  } else {
    return message ? "".padStart(message.length, "*") : "";
  }
};

export default logger;
