import { useQuery, useMutation, useApolloClient } from '@apollo/client/react';
import { GET_LIST_ITEMS, UPDATE_PRICE, DELETE_ITEM, UPDATE_ALL_FROM_URL, ADD_NEW_MEMBER, ADD_ITEM_TO_LIST } from "@/app/api/graphql/operations";
import { useState, useEffect } from 'react';
import type { Item } from '@/types/itemType';
import { useDebounce } from '@/hooks/useDebouncer';

export function useListItems(listId: number) {
    const client = useApolloClient()
    const [priceDiffMap, setPriceDiffMap] = useState<Record<number, string>>({});
    const [searchText, setSearchText] = useState("")
    const [take, setTake] = useState(4)
    const [skip, setSkip] = useState(0)
    const debouncedSearch = useDebounce(searchText, 300);

    const { loading, error, data, refetch } = useQuery(
        GET_LIST_ITEMS,
        {
            skip: !listId,
            variables: {
                getListItemsId: listId,
                searchText: debouncedSearch,
                take: take,
                skip: skip
            },
        }
    );

    useEffect(() => {
        refetch({
            getListItemsId: listId,
            debouncedSearch,
            take,
            skip
        })
    }, [debouncedSearch, take, skip])

const [updatePrice] = useMutation(UPDATE_PRICE, {
    onCompleted: (data) => {
        const updatedItem = data.updatePrice;
        
        client.cache.modify({
            id: client.cache.identify({ __typename: 'Item', id: updatedItem.id }),
            fields: {
                price: () => updatedItem.price,
                lastUpdatedDate: () => updatedItem.lastUpdatedDate
            }
        });
    }
});

    const [deleteItem] = useMutation(DELETE_ITEM, {
        onCompleted: () => {
            refetch()
        }
    });

    const [addNewMember] = useMutation(ADD_NEW_MEMBER);

    const [updateAllPriceFromUrl] = useMutation(UPDATE_ALL_FROM_URL)

    const handleUpdateAllPrices = async () => {
        const currentItems = data?.getListItems.items ?? [];

        const oldPrices = new Map<number, number>();
        currentItems.forEach((item: Item) => {
            oldPrices.set(item.id, item.price);
        });

        const result = await updateAllPriceFromUrl({
            variables: { listId }
        });

        const updatedItems = result.data?.updateAllPricesFromUrl ?? [];

        const diffMap: Record<number, string> = {};

        updatedItems.forEach((item: Item) => {
            const oldPrice = oldPrices.get(item.id);
            if (!oldPrice) return;

            const percentage =
                ((item.price - oldPrice) / oldPrice) * 100;

            const formatted = percentage.toFixed(2);

            diffMap[item.id] =
                percentage > 0
                    ? `+${formatted}%`
                    : `${formatted}%`;
        });

        setPriceDiffMap(diffMap);
    };

    const [addItemToList] = useMutation(ADD_ITEM_TO_LIST);

    return {
        loading,
        error,
        items: data?.getListItems.items ?? [],
        listName: data?.getListItems.name,
        updatePrice,
        deleteItem,
        handleUpdateAllPrices,
        priceDiffMap,
        refetchItems: refetch,
        setSearchText,
        searchText,
        take,
        setTake,
        skip,
        setSkip,
        totalCount: data?.getListItems.totalCount,
        addNewMember,
        addItemToList
    };
}