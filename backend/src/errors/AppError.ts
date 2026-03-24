import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
  constructor(message: string, code: string, statusCode?: number) {
    super(message, {
      extensions: { code, statusCode },
    });
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", "UNAUTHORIZED", 401);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, detail?: string) {
    super(
      `External service error: ${service}${detail ? ` — ${detail}` : ""}`,
      "EXTERNAL_SERVICE_ERROR",
      502
    );
  }
}

export class ParseError extends AppError {
  constructor(what: string) {
    super(`Failed to parse: ${what}`, "PARSE_ERROR", 422);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, "CONFLICT", 409);
  }
}