import { CategoryKey } from "./categoryType"
import { List } from "./listType"

export interface Item {
    id: number,
    ownerId: number,
    name: string,
    price: number,
    category: CategoryKey
    addDate: Date,
    lastUpdatedDate: Date,
    link: string;
}