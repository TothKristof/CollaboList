import { prisma } from "../prismaClient";
import { requireAuth } from "../utils/auth";
import { NotFoundError } from "../errors/AppError";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import { Context } from "../types/context";
import bcrypt from "bcrypt";

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

async function register(email: string, password: string, username: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username
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

async function findUserByText(searchText: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: searchText ?? "",
              mode: "insensitive" as const,
            },
          },
          {
            username: {
              contains: searchText ?? "",
              mode: "insensitive" as const,
            },
          },
        ],
      },
    });

    if (!users.length) throw new NotFoundError("User");

    return users;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    handlePrismaError(error);
  }
}

export const userService = {
  fetchLoggedInUser,
  register,
  findUserByEmail,
  findUserByText
};