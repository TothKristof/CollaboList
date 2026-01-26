import { List } from "@/types/listType";
import { categories } from "./categories";
import { items } from "./items";

export const lists: List[] = [
    {
        id: 1,
        ownerId : 1,
        name: 'Tech products',
        category: "Gaming",
        items: [items[0],items[1]]
    },
        {
        id: 2,
        ownerId: 1,
        name: 'Home',
        category: "HomeLiving",
        items: [items[0]]
    },

]

