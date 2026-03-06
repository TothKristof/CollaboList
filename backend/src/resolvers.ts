import 'dotenv/config'
import { prisma } from "./prismaClient"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Category } from "./generated/prisma";
import { requireAuth } from './utils/auth';
import { ValidationError, UnauthorizedError, NotFoundError } from './errors/AppError';
import { handlePrismaError } from './errors/prismaErrorHandler';
import { userService } from './services/user.service';
import { itemService } from './services/item.service';
import { listService } from './services/list.service';
import { Context } from './types/context';

export const resolvers = {
  Query: {
    users: async () => {
      return userService.findAllUser();
    },

    me: async (_: unknown, __: unknown, context: Context) => {
      return userService.fetchLoggedInUser(context);
    },

    userData: async (_: unknown, __: unknown, context: Context) => {
      const [lists, items] = await Promise.all([
        listService.getAllListOfUser(context),
        itemService.getUserRecentlyAddedItems(context),
      ]);

      return { items, lists };
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

      return {
        id: list!.id,
        name: list!.name,
        items,
        totalCount,
      };
    },
  },

  Mutation: {
    register: async (_: unknown, args: { email: string; password: string }) => {
      return userService.register(args.email, args.password);
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
      return itemService.updatePriceOfItem(itemId, newPrice);
    },

    deleteItem: async (_: unknown, args: { itemId: number }, context: Context) => {
      requireAuth(context);

      try {
        return await prisma.item.delete({
          where: { id: args.itemId },
        });
      } catch (error) {
        handlePrismaError(error);
      }
    },

    updatePriceFromUrl: async (_: unknown, { itemId }: { itemId: number }, context: Context) => {
      requireAuth(context);

      const item = await itemService.getItemById(itemId);
      const numericPrice = await itemService.fetchPriceFromUrl(item!.link);
      return itemService.updatePriceOfItem(itemId, numericPrice);
    },

    updateAllPricesFromUrl: async (_: unknown, { listId }: { listId: number }, context: Context) => {
      requireAuth(context);

      try {
        const items = await prisma.item.findMany({ where: { listId } });

        const results = await Promise.allSettled(
          items.map(async (item) => {
            const numericPrice = await itemService.fetchPriceFromUrl(item.link);
            return prisma.item.update({
              where: { id: item.id },
              data: { price: numericPrice, lastUpdatedDate: new Date() },
            });
          })
        );

        return results
          .filter((r): r is PromiseFulfilledResult<typeof results[0] extends PromiseFulfilledResult<infer T> ? T : never> => r.status === "fulfilled")
          .map((r) => r.value);
      } catch (error) {
        handlePrismaError(error);
      }
    },
  },
};