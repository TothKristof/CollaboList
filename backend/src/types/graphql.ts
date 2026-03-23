export interface AddItemInput {
  listId: number
  name: string
  price: number
  link: string
  imgLink?: string
}

export enum ActivityCategory {
  ADD_ITEM,
  UPDATE_ITEM,
  UPDATE_MULTIPLE_ITEM,
  DELETE_ITEM,
  ADD_MEMBER,
  CREATE_LIST
}