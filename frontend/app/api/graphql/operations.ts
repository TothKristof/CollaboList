import { gql } from "@apollo/client";

export const GET_LIST_ITEMS = gql`
query getListItems($getListItemsId: Int!) {
  getListItems(id: $getListItemsId) {
    id
    name
    items {
      addDate
      category
      id
      lastUpdatedDate
      price
      name
      link
    }
  }
}
`;

export const UPDATE_PRICE = gql`
  mutation updatePrice($itemId: Int!, $newPrice: Int!) {
    updatePrice(itemId: $itemId, newPrice: $newPrice) {
      id
      price
      lastUpdatedDate
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: Int!) {
    deleteItem(itemId: $itemId) {
      id
      name
    }
  }
`;

export const USER_DATAS = gql`
  query GetUserData{
      userData {
        items {
          id
          name
          price
          category
          link
          addDate
          lastUpdatedDate
          list {
            name
          }
        }
        lists {
          id
          category
          name
        }
      } 
  }
`;

export const UPDATE_ALL_FROM_URL = gql`
    mutation UpdateAllPricesFromUrl($listId: Int!) {
        updateAllPricesFromUrl(listId: $listId) {
            id
            name
            price
            category
            link
            addDate
            lastUpdatedDate
            list {
                name
            }
  }
}
`;