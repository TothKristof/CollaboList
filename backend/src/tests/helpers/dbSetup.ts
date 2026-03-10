import { prisma } from "../../prismaClient";

export async function resetDatabase() {
  await prisma.item.deleteMany();
  await prisma.listUser.deleteMany();
  await prisma.list.deleteMany();
  await prisma.user.deleteMany();
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}