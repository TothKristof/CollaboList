import { ActivityCategory } from "../generated/prisma/index.js";
import { prisma } from "../prismaClient";
import { Context } from "../types/context";
import { requireAuth } from "../utils/auth.js";
import { handlePrismaError } from "../errors/prismaErrorHandler.js";

interface ActivityProps {
    userId: number,
    username: string,
    listName?: string,
    itemName?: string,
    oldPrice?: number,
    newPrice?: number
}

function buildMessage(actor: string, category: ActivityCategory, props: ActivityProps): string {
    switch (category) {
        case ActivityCategory.ADD_ITEM:
            return `${actor} added ${props.itemName} to ${props.listName}`
        case ActivityCategory.UPDATE_ITEM:
            return `${actor} updated ${props.itemName} price from ${props.oldPrice} to ${props.newPrice} HUF in ${props.listName}`
        case ActivityCategory.UPDATE_MULTIPLE_ITEM:
            return `${actor} updated all prices in ${props.listName}`
        case ActivityCategory.DELETE_ITEM:
            return `${actor} deleted ${props.itemName} from ${props.listName}`
        case ActivityCategory.ADD_MEMBER:
            return `${actor} added a new member to ${props.listName}`
        case ActivityCategory.CREATE_LIST:
            return `${actor} created list ${props.listName}`
        default:
            return `${actor} performed an action`
    }
}

async function addActivity(context: Context, category: ActivityCategory, props: ActivityProps) {
    const actor = context.userId === props.userId ? 'You' : props.username
    const message = buildMessage(actor, category, props)

    await prisma.activity.create({
        data: {
            userId: props.userId,
            message,
            activityCategory: category,
        }
    })
}

async function addActivityForListMembers(context: Context, listId: number, category: ActivityCategory, props: ActivityProps) {
    const listUsers = await prisma.listUser.findMany({
        where: { listId },
        include: { user: true }
    });

    await Promise.all(
        listUsers.map((listUser) => {
            const actor = listUser.userId === context.userId ? 'You' : props.username
            const message = buildMessage(actor, category, props)

            return prisma.activity.create({
                data: {
                    userId: listUser.userId,
                    message,
                    activityCategory: category,
                }
            })
        })
    )
}

async function getUserRecentActivities(context: Context) {
  requireAuth(context);
  try {
    return await prisma.activity.findMany({
      where: {
        userId: context.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export const activityService = {
    addActivity,
    addActivityForListMembers,
    getUserRecentActivities
};