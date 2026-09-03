import { env } from "@/env";

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
  timestamp?: string;
}

class Logger {
  private formatLog(level: LogLevel, payload: LogPayload) {
    return JSON.stringify({
      timestamp: payload.timestamp ?? new Date().toISOString(),
      level,
      message: payload.message,
      ...(payload.context ? { context: payload.context } : {}),
      ...(payload.error instanceof Error
        ? {
            error: {
              name: payload.error.name,
              message: payload.error.message,
              stack: payload.error.stack,
            },
          }
        : payload.error
          ? { error: payload.error }
          : {}),
    });
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (env.NODE_ENV === "development") {
      console.debug(this.formatLog("debug", { message, context }));
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    console.info(this.formatLog("info", { message, context }));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(this.formatLog("warn", { message, context }));
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    console.error(this.formatLog("error", { message, error, context }));
  }
}

export const logger = new Logger();
