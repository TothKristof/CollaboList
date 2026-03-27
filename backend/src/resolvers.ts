import 'dotenv/config'
import { prisma } from "./prismaClient"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Category } from "./generated/prisma";
import { requireAuth } from './utils/auth';
import { ValidationError } from './errors/AppError';
import { userService } from './services/user.service';
import { itemService } from './services/item.service';
import { listService } from './services/list.service';
import { Context } from './types/context';
import { dateScalar } from './utils/dateScalar';
import { AddItemInput } from './types/graphql';
import { activityService } from './services/activity.service';
import { NotFoundError } from './errors/AppError';
import { ActivityCategory } from './generated/prisma';

export const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (_: unknown, __: unknown, context: Context) => {
      return userService.fetchLoggedInUser(context);
    },

    userData: async (_: unknown, __: unknown, context: Context) => {
      const [lists, items, activities] = await Promise.all([
        listService.getAllListOfUser(context),
        itemService.getUserRecentlyAddedItems(context),
        activityService.getUserRecentActivities(context)
      ]);

      return { items, lists, activities };
    },

    getListItems: async (_: unknown, args: { id: number; searchText?: string; skip?: number; take?: number }, context: Context) => {
      const list = await listService.getListById(context, args.id);

      const whereFilter = {
        listId: args.id,
        name: {
          contains: args.searchText ?? "",
          mode: "insensitive" as const,
        },
      };

      const [items, totalCount] = await Promise.all([
        prisma.item.findMany({
          where: whereFilter,
          skip: args.skip ?? 0,
          take: args.take ?? 5,
          orderBy: { id: "desc" },
        }),
        prisma.item.count({ where: whereFilter }),
      ]);

      const listrole = await userService.getRoleInList(list.id, context.userId)

      return {
        id: list!.id,
        name: list!.name,
        items,
        totalCount,
        listrole
      };
    },

    searchUsers: async (_: unknown, args: { searchText: string }, context: Context) => {
      return userService.findUserByText(args.searchText);
    },

    getListMembers: async (_, { listId }) => {
      return listService.getListMembers(listId);
    },

    getItemDetailsFromUrl: async (_, { url }) => {
      const price = await itemService.fetchPriceFromUrl(url)
      const imgLink = await itemService.fetchImageFromUrl(url)

      return {
        price,
        imgLink
      }
    }
  },

  Mutation: {
    register: async (_: unknown, args: { email: string; password: string, username: string }) => {
      return userService.register(args.email, args.password, args.username);
    },

    login: async (_: unknown, args: { email: string; password: string }, context: Context) => {
      const user = await userService.findUserByEmail(args.email);

      const valid = await bcrypt.compare(args.password, user!.password);
      if (!valid) throw new ValidationError("Invalid credentials");

      const token = jwt.sign(
        { userId: user!.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      context.res.setHeader(
        "Set-Cookie",
        `auth_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
      );

      return { token: "logged-in", user };
    },

    logout: async (_: unknown, __: unknown, context: Context) => {
      context.res.setHeader(
        "Set-Cookie",
        `auth_token=; HttpOnly; Path=/; Max-Age=0`
      );
      return true;
    },

    addList: async (_: unknown, args: { name: string; category: Category }, context: Context) => {
      return listService.addNewList(context, args.name, args.category);
    },

    updatePrice: async (_: unknown, { itemId, newPrice }: { itemId: number; newPrice: number }, context: Context) => {
      requireAuth(context);

      const item = await itemService.getItemById(itemId, context);
      if (!item) throw new NotFoundError("Item");

      const [list, user] = await Promise.all([
        item.listId ? prisma.list.findUnique({ where: { id: item.listId } }) : null,
        prisma.user.findUnique({ where: { id: context.userId as number } })
      ]);

      const updated = await itemService.updatePriceOfItem(itemId, newPrice);

      await activityService.addActivity(context, ActivityCategory.UPDATE_ITEM, {
        userId: context.userId as number,
        username: user!.username,
        itemName: item.name,
        listName: list?.name,
        oldPrice: item.price,
        newPrice
      });

      return updated;
    },

    deleteItem: async (_: unknown, { itemId }: { itemId: number }, context: Context) => {
      return itemService.deleteItem(context, itemId);
    },

    updatePriceFromUrl: async (_: unknown, { itemId }: { itemId: number }, context: Context) => {
      return itemService.updatePriceFromUrl(context, itemId);
    },

    updateAllPricesFromUrl: async (_: unknown, { listId }: { listId: number }, context: Context) => {
      return itemService.updateAllPricesFromUrl(context, listId);
    },

    addNewMemberToList: async (_, { listUser }, context) => {
      const result = await listService.addNewMemberToList(
        context, listUser.userId, listUser.listId, listUser.listRole
      );

      if (!result) throw new Error("Failed to add member");

      return {
        userId: result.userId,
        listId: result.listId,
        listRole: result.role
      };
    },

    addItemToList: async (_: unknown, { itemInputs }: { itemInputs: AddItemInput }, context: Context) => {
      return itemService.addItemToList(
        context,
        itemInputs.listId,
        itemInputs.name,
        itemInputs.price,
        itemInputs.link,
        itemInputs.imgLink
      )
    },

    createInvitation: async (_, { listId, role }, context: Context) => {
      return listService.createInvitation(context, listId, role);
    }
  },
};