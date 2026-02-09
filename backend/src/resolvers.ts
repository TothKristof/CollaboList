import { prisma } from "../prismaClient.js";

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    register: async (parent, args) => {
      return await prisma.user.create({
        data: {
          email: args.email,
          password: args.password,
        },
      });
    },
  },
};