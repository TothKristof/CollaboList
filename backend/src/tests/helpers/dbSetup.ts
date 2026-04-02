import { prisma } from "../../prismaClient";

export async function resetDatabase() {
  await prisma.invitation.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.listUser.deleteMany();
  await prisma.item.deleteMany();
  await prisma.list.deleteMany();
  await prisma.user.deleteMany();
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}