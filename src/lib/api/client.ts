import { env } from "@/env";
import {
  AppError,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors/AppError";
import { logger } from "@/lib/logger/logger";
import type { ApiErrorDetail, ApiResponse } from "@/types/api";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
  authToken?: string;
}

class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = env.API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const url = new URL(
      path.startsWith("http") ? path : `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private generateCorrelationId(): string {
    return `corr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Extract user-friendly error message from standard Node.js / Express / NestJS API error payloads
   */
  private extractErrorMessage(
    errorData: unknown,
    statusText: string,
    status: number
  ): { message: string; details?: unknown } {
    if (!errorData || typeof errorData !== "object") {
      return { message: `HTTP error ${status}: ${statusText}` };
    }

    const payload = errorData as Record<string, unknown>;
    let message = `HTTP error ${status}`;
    let details: unknown = undefined;

    if (typeof payload.message === "string") {
      message = payload.message;
    } else if (Array.isArray(payload.message)) {
      message = payload.message.join("; ");
      details = payload.message.map((m: unknown) => ({ message: String(m) }));
    }

    return { message, details: details ?? payload.details };
  }

  public async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
      body,
      params,
      timeoutMs = 15000,
      headers = {},
      authToken,
      credentials = "include",
      ...rest
    } = options;
    const url = this.buildUrl(path, params);
    const correlationId = this.generateCorrelationId();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Correlation-ID": correlationId,
    };

    if (authToken) {
      defaultHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    try {
      logger.debug(`HTTP Request: ${rest.method ?? "GET"} ${url}`, { correlationId });

      const requestInit: RequestInit = {
        ...rest,
        credentials,
        headers: { ...defaultHeaders, ...(headers as Record<string, string>) },
        signal: controller.signal,
      };

      if (body !== undefined) {
        requestInit.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestInit);

      clearTimeout(timer);

      if (!response.ok) {
        let errorData: unknown = null;
        try {
          errorData = await response.json();
        } catch {
          // Response payload was not JSON
        }

        const { message, details } = this.extractErrorMessage(
          errorData,
          response.statusText,
          response.status
        );

        switch (response.status) {
          case 400:
            throw new ValidationError(message, details as ApiErrorDetail[] | undefined);
          case 401:
            throw new UnauthorizedError(message);
          case 403:
            throw new ForbiddenError(message);
          case 404:
            throw new NotFoundError(message);
          default:
            throw new AppError(
              message,
              "INTERNAL_SERVER_ERROR",
              response.status,
              details as ApiErrorDetail[] | undefined
            );
        }
      }

      const json = await response.json();
      return json as ApiResponse<T>;
    } catch (error) {
      clearTimeout(timer);

      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new AppError(`Request timed out after ${timeoutMs}ms`, "TIMEOUT_ERROR", 504);
      }

      logger.error("HTTP Fetch failure", error, { url, correlationId });
      throw new NetworkError(error instanceof Error ? error.message : "Network failure");
    }
  }

  public get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  public post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  public put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  public patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  public delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const httpClient = new HttpClient();
