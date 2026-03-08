import { prisma } from "../../prismaClient";
import bcrypt from "bcrypt";

export async function seedUser() {
  return prisma.user.create({
    data: {
      email: "test@test.com",
      password: await bcrypt.hash("password123", 10),
    },
  });
}

export async function seedList(ownerId: number) {
  return prisma.list.create({
    data: {
      name: "Test List",
      category: "Gaming",
      ownerId,
    },
  });
}

export async function seedItem(ownerId: number, listId: number) {
  return prisma.item.create({
    data: {
      name: "Test Item",
      price: 1000,
      category: "Gaming",
      link: "https://example.com",
      addDate: new Date(),
      lastUpdatedDate: new Date(),
      ownerId,
      listId,
    },
  });
}