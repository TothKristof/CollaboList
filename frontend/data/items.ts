import { Item } from "@/types/itemType";
import { lists } from "./lists";

export const items: Item[] = [
    {
        id: 1,
        ownerId: 1,
        name: "Wireless Mouse",
        price: 7990,
        category: "Gaming",
        addDate: new Date("2025-01-15"),
        lastUpdatedDate: new Date("2025-01-10"),
    },
    {
        id: 2,
        ownerId: 1,
        name: "Mechanical Keyboard",
        price: 29990,
        category: "Gaming",
        addDate: new Date("2025-01-12"),
        lastUpdatedDate: new Date("2025-01-15"),
    },
];