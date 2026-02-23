import 'dotenv/config'
import { Category } from "../src/generated/prisma/index.js";
import { prisma } from "../src/prismaClient.js"
import bcrypt from "bcrypt";

async function main() {
  await prisma.list.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  const hashedAdmin = await bcrypt.hash("admin", 10);
  const hashedAdmin2 = await bcrypt.hash("admin2", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedAdmin
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "admin2@gmail.com",
      password: hashedAdmin2
    },
  });
  
  const mouse = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Logitech G305 Lightspeed Wireless Mouse",
      price: 17990,
      category: Category.Gaming,
      addDate: new Date("2025-01-10"),
      lastUpdatedDate: new Date("2025-01-10"),
      link: "https://eger.arukereso.hu/logitech/g305-lightspeed-black-910-005282-p412572665/",
    },
  });

  const keyboard = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "Keychron B6 Pro",
      price: 34990,
      category: Category.Gaming,
      addDate: new Date("2025-01-11"),
      lastUpdatedDate: new Date("2025-01-11"),
      link: "https://www.arukereso.hu/billentyuzet-c3111/keychron/b6-pro-hu-b6p-k1-hg-p1177012114/",
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
      link: "https://www.arukereso.hu/fulhallgato-fejhallgato-c3109/sony/wh-1000xm5-p917190654/",
    },
  });

  const ssd = await prisma.item.create({
    data: {
      ownerId: user2.id,
      name: "Samsung 970 EVO Plus 2TB NVMe SSD",
      price: 32990,
      category: Category.Technology,
      addDate: new Date("2025-01-13"),
      lastUpdatedDate: new Date("2025-01-13"),
      link: "https://belso-ssd-meghajto.arukereso.hu/samsung/990-evo-2tb-m-2-mz-v9e2t0bw-p1043179693/",
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
      link: "https://gamepad-kontroller.arukereso.hu/microsoft/xbox-series-x-s-wireless-controller-robot-white-qas-00009-p590841822/",
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
