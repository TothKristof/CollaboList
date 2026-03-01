import { useQuery, useMutation } from '@apollo/client/react';
import { GET_LIST_ITEMS, UPDATE_PRICE, DELETE_ITEM, UPDATE_ALL_FROM_URL } from "@/app/api/graphql/operations";
import { useMemo, useState } from 'react';
import type { Item } from '@/types/itemType';

export function useListItems(listId: number) {
    const [priceDiffMap, setPriceDiffMap] = useState<Record<number, string>>({});

    const { loading, error, data } = useQuery(GET_LIST_ITEMS, {
        skip: !listId,
        variables: { getListItemsId: listId },
    });

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

    const transformedItems = useMemo(() => {
        const items = data?.getListItems.items ?? [];

        return items.map((item: Item) => ({
            ...item,
            addDate: new Date(Number(item.addDate)),
            lastUpdatedDate: new Date(Number(item.lastUpdatedDate)),
        }));
    }, [data?.getListItems.items]);

    return {
        loading,
        error,
        items: transformedItems,
        listName: data?.getListItems.name,
        updatePrice,
        deleteItem,
        handleUpdateAllPrices,
        priceDiffMap
    };
}