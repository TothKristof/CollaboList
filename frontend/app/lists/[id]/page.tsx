"use client"
import { useParams } from 'next/navigation'
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';
import { Heading } from '@kinsta/stratus';
import ItemTable from '@/components/ItemTable';
import { useMemo } from 'react';
import { Item } from '@/types/itemType';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

type EditPriceArgs = {
    itemId: Item["id"];
    newPrice: Item["price"];
};

const GET_LIST_ITEMS = gql`
    query getListItems($getListItemsId: Int!) {
        getListItems(id: $getListItemsId) {
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

const UPDATE_PRICE = gql`
    mutation updatePrice($itemId: Int!, $newPrice: Int!) {
        updatePrice(itemId: $itemId, newPrice: $newPrice) {
            id
            price
            lastUpdatedDate
        }
    }
`

const DELETE_ITEM = gql`
    mutation DeleteItem($itemId: Int!) {
        deleteItem(itemId: $itemId) {
            id
            name
    }
}
`

function ListPage() {
    let params = useParams();
    const listId = Number(params.id);
    const { loading, error, data } = useQuery(GET_LIST_ITEMS, {
        skip: !listId,
        variables: { getListItemsId: listId }
    })
    const [updatePrice] = useMutation(UPDATE_PRICE)
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


    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    // const [items, setItems] = useState<Item[]>(list.items)

    const items = data?.getListItems ?? [];
    const listName = items[0]?.list?.name;

    const transformedItems = useMemo(() => {
        if (!data?.getListItems) return [];

        return data.getListItems.map((item: Item) => ({
            ...item,
            addDate: new Date(Number(item.addDate)),
            lastUpdatedDate: new Date(Number(item.lastUpdatedDate)),
        }));
    }, [data]);

    function editPrice({
        itemId,
        newPrice,
    }: EditPriceArgs) {
        updatePrice({ variables: { itemId: itemId, newPrice: newPrice } })
    }

    return (
        <CenterContentDiv>
            <ListDiv>
                <RowWithSpaceBetween>
                    <Heading size='l'>{listName}</Heading>
                    <div>Item count: {items?.length}</div>
                </RowWithSpaceBetween>
                <ItemTable
                    tableData={transformedItems}
                    actions={{
                        onEditPrice: (item) => {
                            editPrice({ itemId: item.id, newPrice: item.price });
                        },
                        onDelete: (item) => {
                            deleteItem({ variables: { itemId: item.id } });
                        },
                    }}
                />
            </ListDiv>
        </CenterContentDiv>
    )
}

export default ListPage