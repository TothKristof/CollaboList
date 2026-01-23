import { Item } from "@/types/itemType";
import { categories } from "./categories";

export const items: Item[] = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 7990,
        category: categories.Home,
        addDate: new Date("2025-01-15"),
        lastUpdatedDate: new Date("2025-01-10"),
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 29990,
        category: categories.Shop,
        addDate: new Date("2025-01-12"),
        lastUpdatedDate: new Date("2025-01-15"),
    },
];