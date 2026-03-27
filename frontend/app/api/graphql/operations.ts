import { gql } from "@apollo/client";

export const GET_LIST_ITEMS = gql`
query getListItems($getListItemsId: Int!, $searchText: String, $take: Int, $skip: Int) {
  getListItems(id: $getListItemsId, skip: $skip, take: $take, searchText: $searchText) {
    id
    name
    totalCount
    listrole
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
        activities {
          id
          userId
          message
          activityCategory
          createdAt
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

export const ADD_NEW_MEMBER = gql`
    mutation AddNewMemberToList($listUser: ListUserInput!) {
        addNewMemberToList(listUser: $listUser) {
            userId
            listId
        }
    }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($searchText: String!) {
    searchUsers(searchText: $searchText) {
      id
      email
      username
    }
  }
`;

export const GET_LIST_MEMBERS = gql`
  query GetListMembers($listId: Int!) {
    getListMembers(listId: $listId) {
      user {
        email
        id
        username
      }
      role
    }
}
`;

export const GET_ITEM_DETAILS_FROM_URL = gql`
  query GetItemDetailsFromUrl($url: String!) {
    getItemDetailsFromUrl(url: $url) {
      imgLink
      price
    }
  }
`;

export const ADD_ITEM_TO_LIST = gql`
  mutation AddItemToList($itemInputs: AddItemInput) {
    addItemToList(itemInputs: $itemInputs) {
      id
      name
      price
      category
      link
      addDate
      lastUpdatedDate
    }
  }
`;

