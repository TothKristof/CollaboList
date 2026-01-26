import { Category, CategoryKey } from "./categoryType";
import { Item } from "./itemType";

export interface List{
    id: number,
    ownerId: number,
    name: string,
    category: CategoryKey
    items: Item[]
}