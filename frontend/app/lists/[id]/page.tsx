"use client"
import { useParams } from 'next/navigation'
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';
import { Heading, Button, Stack } from '@kinsta/stratus';
import ItemTable from '@/components/ItemTable';
import { useMemo } from 'react';
import { Item } from '@/types/itemType';
import { useListItems } from '@/app/features/lists/useListItems';


type EditPriceArgs = {
    itemId: Item["id"];
    newPrice: Item["price"];
};

function ListPage() {
    const params = useParams();
    const listId = Number(params.id);

    const { loading, error, items, listName, updatePrice, deleteItem, handleUpdateAllPrices, priceDiffMap } =
        useListItems(listId);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

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
                    <Stack direction='row'>
                        <Button
                            onClick={() => handleUpdateAllPrices()}>
                            Update all price
                        </Button>
                        <div>Item count: {items?.length}</div>
                    </Stack>
                </RowWithSpaceBetween>
                <ItemTable
                    tableData={items}
                    actions={{
                        onEditPrice: (item) => {
                            editPrice({ itemId: item.id, newPrice: item.price });
                        },
                        onDelete: (item) => {
                            deleteItem({ variables: { itemId: item.id } });
                        },
                    }}
                    priceDiffMap={priceDiffMap}
                />
            </ListDiv>
        </CenterContentDiv>
    )
}

export default ListPage