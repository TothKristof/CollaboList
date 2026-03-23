import 'dotenv/config'
import { Category, ActivityCategory } from "../src/generated/prisma/index.js";
import { prisma } from "../src/prismaClient.js"
import bcrypt from "bcrypt";

async function addSeedActivity(userId: number, category: ActivityCategory, message: string) {
  await prisma.activity.create({
    data: {
      userId,
      message,
      activityCategory: category,
    }
  })
}

async function main() {
  await prisma.listUser.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.item.deleteMany();
  await prisma.list.deleteMany();
  await prisma.user.deleteMany();

  const hashedAdmin = await bcrypt.hash("admin", 10);
  const hashedAdmin2 = await bcrypt.hash("admin2", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedAdmin,
      username: "Matt Damon"
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "admin2@gmail.com",
      password: hashedAdmin2,
      username: "Tom Cruise"
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

  const headset = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "SteelSeries Arctis 7 Wireless Headset",
      price: 45990,
      category: Category.Gaming,
      addDate: new Date("2025-01-12"),
      lastUpdatedDate: new Date("2025-01-12"),
      link: "https://www.arukereso.hu/fulhallgato-fejhallgato-c3109/steelseries/arctis-7-p371749776/",
    },
  });

  const monitor = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "ASUS TUF Gaming VG27AQ Monitor",
      price: 129990,
      category: Category.Gaming,
      addDate: new Date("2025-01-13"),
      lastUpdatedDate: new Date("2025-01-13"),
      link: "https://www.arukereso.hu/monitor-c3126/asus/tuf-gaming-vg27aq-p484737584/",
    },
  });

  const mousepad = await prisma.item.create({
    data: {
      ownerId: user1.id,
      name: "SteelSeries QcK Heavy XXL Mousepad",
      price: 9990,
      category: Category.Gaming,
      addDate: new Date("2025-01-15"),
      lastUpdatedDate: new Date("2025-01-15"),
      link: "https://www.arukereso.hu/egerpad-c4134/steelseries/qck-heavy-xxl-p254783552/",
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
      name: "Gaming setup",
      category: Category.Gaming,
      items: {
        connect: [
          { id: mouse.id },
          { id: keyboard.id },
          { id: headphones.id },
          { id: monitor.id },
          { id: mousepad.id },
          { id: headset.id }
        ],
      },
      listUsers: {
        create: [
          { userId: user1.id, role: "OWNER" },
          { userId: user2.id, role: "COLLABORATOR" },
        ]
      }
    },
  });

  await addSeedActivity(user1.id, ActivityCategory.CREATE_LIST, 'You created list Gaming setup')
  await addSeedActivity(user2.id, ActivityCategory.ADD_MEMBER, 'Tom Cruise added a new member to Gaming setup')
  await addSeedActivity(user1.id, ActivityCategory.ADD_ITEM, 'You added Logitech G305 Lightspeed Wireless Mouse to Gaming setup')
  await addSeedActivity(user1.id, ActivityCategory.ADD_ITEM, 'You added Keychron B6 Pro to Gaming setup')
  await addSeedActivity(user1.id, ActivityCategory.ADD_ITEM, 'You added SteelSeries Arctis 7 Wireless Headset to Gaming setup')
  await addSeedActivity(user1.id, ActivityCategory.UPDATE_ITEM, 'You updated Logitech G305 Lightspeed Wireless Mouse price from 19990 to 17990 HUF in Gaming setup')


  await prisma.list.create({
    data: {
      name: "Smart home & gadgets",
      category: Category.HomeLiving,
      items: {
        connect: [{ id: hue.id }],
      },
      listUsers: {
        create: [{ userId: user1.id, role: "OWNER" }]
      }
    },
  });

  await addSeedActivity(user1.id, ActivityCategory.CREATE_LIST, 'You created list Smart home & gadgets')
  await addSeedActivity(user1.id, ActivityCategory.ADD_ITEM, 'You added Philips Hue White and Color Ambiance Starter Kit to Smart home & gadgets')

  await prisma.list.create({
    data: {
      name: "Tech upgrades",
      category: Category.Technology,
      items: {
        connect: [{ id: ssd.id }, { id: controller.id }],
      },
      listUsers: {
        create: [
          { userId: user2.id, role: "OWNER" }
        ]
      }
    },
  });

  await addSeedActivity(user2.id, ActivityCategory.CREATE_LIST, 'You created list Tech upgrades')
  await addSeedActivity(user2.id, ActivityCategory.ADD_ITEM, 'You added Samsung 970 EVO Plus 2TB NVMe SSD to Tech upgrades')
  await addSeedActivity(user2.id, ActivityCategory.ADD_ITEM, 'You added Xbox Wireless Controller Series X to Tech upgrades')


  console.log("🌱 Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
