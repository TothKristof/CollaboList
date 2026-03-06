import { useQuery, useMutation } from '@apollo/client/react';
import { GET_LIST_ITEMS, UPDATE_PRICE, DELETE_ITEM, UPDATE_ALL_FROM_URL } from "@/app/api/graphql/operations";
import { useMemo, useState, useEffect } from 'react';
import type { Item } from '@/types/itemType';

export function useListItems(listId: number) {
    const [priceDiffMap, setPriceDiffMap] = useState<Record<number, string>>({});
    const [searchText, setSearchText] = useState("")
    const [take, setTake] = useState(4)
    const [skip, setSkip] = useState(0)

    const { loading, error, data, refetch } = useQuery(
        GET_LIST_ITEMS,
        {
            skip: !listId,
            variables: {
                getListItemsId: listId,
                searchText: searchText,
                take: take,
                skip: skip
            },
        }
    );

    useEffect(() => {
        refetch({
            getListItemsId: listId,
            searchText,
            take,
            skip
        })
    }, [searchText, take, skip])

    const [updatePrice] = useMutation(UPDATE_PRICE);

    const [deleteItem] = useMutation(DELETE_ITEM, {
        update(cache, { data }) {
            const deletedId = data?.deleteItem?.id;

            cache.modify({
                fields: {
                    getListItems(existingItemRefs = [], { readField }) {
                        return existingItemRefs.filter(
                            (itemRef: any) =>
                                readField("id", itemRef) !== deletedId
                        );
                    },
                },
            });
        },
    });

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
        totalCount: data?.getListItems.totalCount
    };
}