import 'dotenv/config'
import { Category } from "../src/generated/prisma/index.js";
import {prisma} from "../src/prismaClient.js"

async function main() {
  await prisma.list.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: { email: "admin@gmail.com", password: "admin" },
  });

  const user2 = await prisma.user.create({
    data: { email: "admin2@gmail.com", password: "admin2" },
  });

  const mouse = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Logitech G305 Lightspeed Wireless Mouse",
      price: 17990,
      category: Category.Gaming,
      addDate: new Date("2025-01-10"),
      lastUpdatedDate: new Date("2025-01-10"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Logitech+G305",
    },
  });

  const keyboard = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Keychron K Pro Mechanical Keyboard",
      price: 34990,
      category: Category.Gaming,
      addDate: new Date("2025-01-11"),
      lastUpdatedDate: new Date("2025-01-11"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Keychron+K+Pro",
    },
  });

  const headphones = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Sony WH-1000XM5 Noise Cancelling Headphones",
      price: 139990,
      category: Category.Technology,
      addDate: new Date("2025-01-12"),
      lastUpdatedDate: new Date("2025-01-12"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Sony+WH-1000XM5",
    },
  });

  const ssd = await prisma.item.create({
    data: {
      ownerId: user2.id,
      name: "Samsung 970 EVO Plus 1TB NVMe SSD",
      price: 32990,
      category: Category.Technology,
      addDate: new Date("2025-01-13"),
      lastUpdatedDate: new Date("2025-01-13"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Samsung+970+EVO+Plus+1TB",
    },
  });

  const controller = await prisma.item.create({
    data: {
      ownerId: user2.id,
      name: "Xbox Wireless Controller Series X",
      price: 21990,
      category: Category.Gaming,
      addDate: new Date("2025-01-14"),
      lastUpdatedDate: new Date("2025-01-14"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Xbox+Wireless+Controller+Series+X",
    },
  });

  const hue = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Philips Hue White and Color Ambiance Starter Kit",
      price: 69990,
      category: Category.HomeLiving,
      addDate: new Date("2025-01-16"),
      lastUpdatedDate: new Date("2025-01-16"),
      link: "https://www.arukereso.hu/CategorySearch.php?st=Philips+Hue+Starter+Kit",
    },
  });

  await prisma.list.create({
    data: {
      ownerId: user1.id,
      name: "Gaming setup",
      category: Category.Gaming,
      items: {
        connect: [
          { id: mouse.id },
          { id: keyboard.id },
          { id: headphones.id },
        ],
      },
    },
  });

  await prisma.list.create({
    data: {
      ownerId: user1.id,
      name: "Smart home & gadgets",
      category: Category.HomeLiving,
      items: {
        connect: [{ id: hue.id }],
      },
    },
  });

  await prisma.list.create({
    data: {
      ownerId: user2.id,
      name: "Tech upgrades",
      category: Category.Technology,
      items: {
        connect: [{ id: ssd.id }, { id: controller.id }],
      },
    },
  });

  console.log("🌱 Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
