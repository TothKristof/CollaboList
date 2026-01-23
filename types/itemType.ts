import { Category } from "./categoryType"

export interface Item{
    id: number,
    name: string,
    price: number,
    category: Category | null
    addDate: Date,
    lastUpdatedDate: Date
}