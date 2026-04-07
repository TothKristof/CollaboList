import { useQuery } from '@apollo/client/react';
import { GET_ITEM_BY_ID } from '@/app/api/graphql/operations';

export function useItems(itemId: number) {

    const { loading, error: getItemError, data, refetch } = useQuery(
        GET_ITEM_BY_ID,
        {
            skip: !itemId,
            variables: {
                itemId: itemId
            },
        }
    );

    return{
        loading,
        getItemError,
        refetch,
        item: data?.getItemById
    }
}
