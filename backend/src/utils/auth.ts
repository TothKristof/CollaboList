import { UnauthorizedError } from "../errors/AppError";

export function requireAuth(context: any) {
    if (!context.userId) {
    throw new UnauthorizedError();
  }
}