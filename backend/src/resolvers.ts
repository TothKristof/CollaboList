import 'dotenv/config'
import { prisma } from "./prismaClient"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Category } from "@prisma/client";
import { requireAuth } from './utils/auth';
import { getItemOrThrow, fetchPriceFromUrl } from './services/item.service';

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },

    me: async (_, __, context) => {
      requireAuth(context);

      return prisma.user.findUnique({
        where: { id: context.userId }
      });
    },

    userData: async (_, __, context) => {
      requireAuth(context);

      const lists = prisma.list.findMany({
        where: {
          ownerId: context.userId
        }
      });

      const items = await prisma.item.findMany({
        where: {
          ownerId: context.userId,
        },
        include: {
          list: true,
        },
        orderBy: {
          addDate: "desc",
        },
        take: 6,
      })

      return {
        items,
        lists
      }
    },

    getListItems: async (_, args, context) => {
      requireAuth(context);

      const list = await prisma.list.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!list) {
        throw new Error("List not found");
      }

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
          orderBy: {
            id: "desc",
          },
        }),

        prisma.item.count({
          where: whereFilter,
        }),
      ]);

      return {
        id: list.id,
        name: list.name,
        items,
        totalCount,
      };
    },
  },

  Mutation: {
    register: async (_, args) => {
      return prisma.user.create({
        data: {
          email: args.email,
          password: args.password,
        },
      });
    },

    login: async (_, args, context) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email }
      });

      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      context.res.setHeader(
        "Set-Cookie",
        `auth_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
      );

      return {
        token: "logged-in",
        user
      };
    },

    logout: async (_, __, context) => {
      context.res.setHeader(
        "Set-Cookie",
        `auth_token=; HttpOnly; Path=/; Max-Age=0`
      );
      return true;
    },

    addList: async (_: any, args: { name: string; category: string }, context: any) => {
      requireAuth(context);

      const newList = await prisma.list.create({
        data: {
          name: args.name,
          category: args.category as Category,
          ownerId: context.userId,
        },
        include: {
          items: true,
        },
      });

      return newList;
    },

    updatePrice: async (_, args, context) => {
      requireAuth(context);

      const updatedItem = await prisma.item.update({
        where: { id: args.itemId },
        data: {
          price: args.newPrice,
          lastUpdatedDate: new Date()
        },
      });

      return updatedItem;
    },

    deleteItem: async (_, args, context) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      const deletedUser = await prisma.item.delete({
        where: { id: args.itemId },
      });

      return deletedUser;
    },

    updatePriceFromUrl: async (_, { itemId }, context) => {
      const item = await getItemOrThrow(itemId)
      const numericPrice = await fetchPriceFromUrl(item.link)

      const updatedItem = await prisma.item.update({
        where: { id: itemId },
        data: {
          price: numericPrice,
          lastUpdatedDate: new Date(),
        },
      });

      return updatedItem;
    },

    updateAllPricesFromUrl: async (_, { listId }) => {
      const items = await prisma.item.findMany({
        where: { listId },
      });

      const updatedItems = [];

      for (const item of items) {
        try {
          const numericPrice = await fetchPriceFromUrl(item.link)

          if (!numericPrice) continue;

          const updatedItem = await prisma.item.update({
            where: { id: item.id },
            data: {
              price: numericPrice,
              lastUpdatedDate: new Date(),
            },
          });

          updatedItems.push(updatedItem);
        } catch (err) {
          console.log(`Failed to update item ${item.name}`);
        }
      }

      return updatedItems;
    }
  },
};