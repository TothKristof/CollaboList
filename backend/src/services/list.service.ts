import { prisma } from "../prismaClient";
import { requireAuth } from "../utils/auth";
import { NotFoundError } from "../errors/AppError";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import { Context } from "../types/context";
import { Category } from "../generated/prisma";
import { UnauthorizedError } from "../errors/AppError";

async function getAllListOfUser(context: Context) {
  requireAuth(context);

  try {
    return await prisma.list.findMany({
      where: {
        ownerId: context.userId,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getListById(context: Context, id: number) {
  requireAuth(context);

  try {
    const list = await prisma.list.findUnique({
      where: { id },
    });

    if (!list) throw new NotFoundError("List");
    if(list.ownerId !== context.userId) throw new UnauthorizedError();

    return list;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    handlePrismaError(error);
  }
}

async function addNewList(context: Context, name: string, category: Category) {
  requireAuth(context);

  try {
    return await prisma.list.create({
      data: {
        name,
        category,
        ownerId: context.userId as number,
      },
      include: {
        items: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export const listService = {
  getAllListOfUser,
  getListById,
  addNewList,
};