import { List } from "@/types/listType";
import { items } from "./items";

export const lists: List[] = [
  {
    id: 1,
    ownerId: 1,
    name: "Gaming setup",
    category: "Gaming",
    items: [
      items[0], // Logitech G305
      items[1], // Keychron keyboard
    ],
  },
  {
    id: 2,
    ownerId: 1,
    name: "Smart home & gadgets",
    category: "HomeLiving",
    items: [
      items[6], // Philips Hue
      items[5], // AirTag
    ],
  },
  {
    id: 3,
    ownerId: 1,
    name: "Wellness & lifestyle",
    category: "Wellness",
    items: [
      items[9], // Xiaomi Smart Band 8
    ],
  },
  {
    id: 4,
    ownerId: 1,
    name: "Hobbies",
    category: "Hobbies",
    items: [
      items[10], // LEGO Bonsai
    ],
  },
  {
    id: 5,
    ownerId: 2,
    name: "PC upgrades",
    category: "Technology",
    items: [
      items[3], // Samsung SSD
    ],
  },
  {
    id: 6,
    ownerId: 2,
    name: "Entertainment & learning",
    category: "Learning",
    items: [
      items[7], // Kindle Paperwhite
    ],
  },
  {
    id: 7,
    ownerId: 2,
    name: "Gaming accessories",
    category: "Gaming",
    items: [
      items[4], // Xbox Controller
    ],
  },
  {
    id: 8,
    ownerId: 2,
    name: "Style picks",
    category: "Style",
    items: [
      items[8], // Nike Air Force 1
    ],
  },
];
