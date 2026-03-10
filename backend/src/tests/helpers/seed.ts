import { prisma } from "../../prismaClient";
import bcrypt from "bcrypt";

let userCount = 0;

export function resetUserCount(){
 userCount = 0;
}

export async function seedUser() {
  userCount++;
  return prisma.user.create({
    data: {
      email: `test${userCount}@test.com`,
      password: await bcrypt.hash("password123", 10),
    },
  });
}

export async function seedList(ownerId: number) {
  return prisma.list.create({
    data: {
      name: "Test List",
      category: "Gaming",
      listUsers: {
        create: { userId: ownerId, role: "OWNER" }
      }
    },
  });
}

export async function seedSharedList(ownerID: number, collaboratorId: number) {
  return prisma.list.create({
    data: {
      name: "Shared Test List",
      category: "Gaming",
      listUsers: {
        create: [
          { userId: ownerID, role: "OWNER" },
          { userId: collaboratorId, role: "COLLABORATOR" },
        ]
      }
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