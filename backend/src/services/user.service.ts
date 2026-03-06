import { prisma } from "../prismaClient";
import { requireAuth } from "../utils/auth";
import { NotFoundError } from "../errors/AppError";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import { Context } from "../types/context";

async function fetchLoggedInUser(context: Context) {
  requireAuth(context);

  try {
    const user = await prisma.user.findUnique({
      where: { id: context.userId },
    });

    if (!user) throw new NotFoundError("User");

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    handlePrismaError(error);
  }
}

async function findAllUser() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    handlePrismaError(error);
  }
}

async function register(email: string, password: string) {
  try {
    return await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundError("User");

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    handlePrismaError(error);
  }
}

export const userService = {
  fetchLoggedInUser,
  findAllUser,
  register,
  findUserByEmail,
};