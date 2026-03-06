import { Prisma } from '../generated/prisma';
import { GraphQLError } from "graphql";
import { AppError, NotFoundError, ValidationError } from "./AppError";

export function handlePrismaError(error: unknown): never {
  if (error instanceof AppError) throw error;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new ValidationError(
          `Unique constraint violation on field(s): ${error.meta?.target}`
        );
      case "P2025":
        throw new NotFoundError("Record");
      case "P2003":
        throw new ValidationError("Foreign key constraint failed");
      case "P2016":
        throw new NotFoundError("Related record");
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationError("Invalid data provided to database");
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new GraphQLError("Database connection failed", {
      extensions: { code: "DATABASE_ERROR", statusCode: 503 },
    });
  }

  throw new GraphQLError("Internal server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR", statusCode: 500 },
  });
}