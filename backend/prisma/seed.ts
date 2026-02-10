import { prisma } from "../src/prismaClient.js";
import { Category } from "../src/generated/prisma/index.js";



async function main() {
  await prisma.item.deleteMany();
  await prisma.list.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { email: "admin@gmail.com", password: "admin" },
      { email: "admin2@gmail.com", password: "admin2" },
    ],
  });

  const items = await prisma.item.createMany({
    data: [
      {
        ownerId: 1,
        name: "Logitech G305 Lightspeed Wireless Mouse",
        price: 17990,
        category: Category.Gaming,
        addDate: new Date("2025-01-10"),
        lastUpdatedDate: new Date("2025-01-10"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Logitech+G305",
      },
      {
        ownerId: 1,
        name: "Keychron K Pro Mechanical Keyboard",
        price: 34990,
        category: Category.Gaming,
        addDate: new Date("2025-01-11"),
        lastUpdatedDate: new Date("2025-01-11"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Keychron+K+Pro",
      },
      {
        ownerId: 1,
        name: "Sony WH-1000XM5 Noise Cancelling Headphones",
        price: 139990,
        category: Category.Technology,
        addDate: new Date("2025-01-12"),
        lastUpdatedDate: new Date("2025-01-12"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Sony+WH-1000XM5",
      },
      {
        ownerId: 2,
        name: "Samsung 970 EVO Plus 1TB NVMe SSD",
        price: 32990,
        category: Category.Technology,
        addDate: new Date("2025-01-13"),
        lastUpdatedDate: new Date("2025-01-13"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Samsung+970+EVO+Plus+1TB",
      },
      {
        ownerId: 2,
        name: "Xbox Wireless Controller Series X",
        price: 21990,
        category: Category.Gaming,
        addDate: new Date("2025-01-14"),
        lastUpdatedDate: new Date("2025-01-14"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Xbox+Wireless+Controller+Series+X",
      },
      {
        ownerId: 1,
        name: "Apple AirTag (1 pack)",
        price: 13990,
        category: Category.Personal,
        addDate: new Date("2025-01-15"),
        lastUpdatedDate: new Date("2025-01-15"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Apple+AirTag",
      },
      {
        ownerId: 1,
        name: "Philips Hue White and Color Ambiance Starter Kit",
        price: 69990,
        category: Category.HomeLiving,
        addDate: new Date("2025-01-16"),
        lastUpdatedDate: new Date("2025-01-16"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Philips+Hue+Starter+Kit",
      },
      {
        ownerId: 2,
        name: "Kindle Paperwhite (11th Gen)",
        price: 64990,
        category: Category.Learning,
        addDate: new Date("2025-01-17"),
        lastUpdatedDate: new Date("2025-01-17"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Kindle+Paperwhite+11",
      },
      {
        ownerId: 2,
        name: "Nike Air Force 1 '07",
        price: 42990,
        category: Category.Style,
        addDate: new Date("2025-01-18"),
        lastUpdatedDate: new Date("2025-01-18"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Nike+Air+Force+1+07",
      },
      {
        ownerId: 1,
        name: "Xiaomi Mi Smart Band 8",
        price: 15990,
        category: Category.Wellness,
        addDate: new Date("2025-01-19"),
        lastUpdatedDate: new Date("2025-01-19"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=Xiaomi+Smart+Band+8",
      },
      {
        ownerId: 1,
        name: "LEGO Icons Bonsai Tree (10281)",
        price: 20990,
        category: Category.Hobbies,
        addDate: new Date("2025-01-20"),
        lastUpdatedDate: new Date("2025-01-20"),
        link: "https://www.arukereso.hu/CategorySearch.php?st=LEGO+10281+Bonsai",
      },
    ],
  });

  await prisma.list.create({
    data: {
      ownerId: 1,
      name: "Gaming setup",
      category: Category.Gaming,
      items: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.list.create({
    data: {
      ownerId: 1,
      name: "Smart home & gadgets",
      category: Category.HomeLiving,
      items: {
        connect: [{ id: 7 }, { id: 6 }],
      },
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
