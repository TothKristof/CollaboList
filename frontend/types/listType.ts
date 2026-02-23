import {CategoryKey } from "./categoryType";
import { Item } from "./itemType";

export interface List{
    id: number,
    name: string,
    category: CategoryKey
    items: Item[]
}