// addItemToList.ts
import { GET_ITEM_DETAILS_FROM_URL } from '@/app/api/graphql/operations';
import { useLazyQuery} from '@apollo/client/react';

function useAddItemToList() { 
    const [fetchItemDetails, { error, data, loading }] = useLazyQuery(GET_ITEM_DETAILS_FROM_URL);



    return {
        fetchItemDetails,
        fetchedItemDetails: data,
        isFetching: loading,
        fetchError: error
    };
}

export default useAddItemToList