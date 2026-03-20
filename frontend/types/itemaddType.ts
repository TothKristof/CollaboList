import { CategoryKey } from "./categoryType"

export interface ItemAddInputs{
  name:     string
  price:    number
  category: CategoryKey
  link:     string
  imgLink?:  string
}