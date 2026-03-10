import { prisma } from "../prismaClient";
import { requireAuth } from "../utils/auth";
import { NotFoundError, UnauthorizedError } from "../errors/AppError";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import { Context } from "../types/context";
import { Category } from "../generated/prisma";
import { ListRole } from "../generated/prisma";

async function getUserRoleInList(userId: number, listId: number) {
  const listUser = await prisma.listUser.findUnique({
    where: { userId_listId: { userId, listId } }
  });
  return listUser?.role ?? null;
}

async function requireEditPermission(context: Context, listId: number) {
  requireAuth(context);
  const role = await getUserRoleInList(context.userId!, listId);
  if (!role || role === "GUEST") throw new UnauthorizedError();
}

async function getAllListOfUser(context: Context) {
  requireAuth(context);

  try {
    return await prisma.list.findMany({
      where: {
        listUsers: {
          some: { userId: context.userId }
        }
      },
      include: {
        listUsers: true,
      }
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getListById(context: Context, id: number) {
  requireAuth(context);

  try {
    const listUser = await prisma.listUser.findUnique({
      where: {
        userId_listId: {
          userId: context.userId!,
          listId: id,
        }
      }
    });

    if (!listUser) throw new UnauthorizedError();

    const list = await prisma.list.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!list) throw new NotFoundError("List");

    return list;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) throw error;
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
        listUsers: {
          create: { userId: context.userId as number, role: "OWNER" }
        }
      },
      include: {
        items: true,
        listUsers: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function addNewMemberToList(context: Context, userId: number, listId: number, listRole: ListRole) {
  await requireEditPermission(context, listId);

  try {
    return await prisma.listUser.create({
      data: {
        userId,
        listId,
        role: listRole
      }
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export const listService = {
  getAllListOfUser,
  getListById,
  addNewList,
  getUserRoleInList,
  requireEditPermission,
  addNewMemberToList
};