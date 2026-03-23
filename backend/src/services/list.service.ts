import { prisma } from "../prismaClient";
import { requireAuth } from "../utils/auth";
import { NotFoundError, UnauthorizedError } from "../errors/AppError";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import { Context } from "../types/context";
import { Category } from "../generated/prisma";
import { ListRole } from "../generated/prisma";
import { activityService } from "./activity.service";
import { ActivityCategory } from "../generated/prisma";

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

  const user = await prisma.user.findUnique({ where: { id: context.userId as number } });

  try {
    const list = await prisma.list.create({
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

    await activityService.addActivity(context, ActivityCategory.CREATE_LIST, {
      userId: context.userId as number,
      username: user!.username,
      listName: name
    });

    return list;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function addNewMemberToList(context: Context, userId: number, listId: number, listRole: ListRole) {
  await requireEditPermission(context, listId);

  const [user, list] = await Promise.all([
    prisma.user.findUnique({ where: { id: context.userId as number } }),
    prisma.list.findUnique({ where: { id: listId } })
  ]);

  try {
    const result = await prisma.listUser.create({
      data: { userId, listId, role: listRole }
    });

    await activityService.addActivityForListMembers(context, listId, ActivityCategory.ADD_MEMBER, {
      userId: context.userId as number,
      username: user!.username,
      listName: list?.name
    });

    return result;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getListMembers(listId: number) {
  try {
    return await prisma.listUser.findMany({
      where: { listId: listId },
      include: { user: true }
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
  addNewMemberToList,
  getListMembers
};