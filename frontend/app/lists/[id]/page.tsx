"use client"
import { useParams } from 'next/navigation'
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';
import { Heading, Button, Stack, Input, Counter } from '@kinsta/stratus';
import ItemTable from '@/components/ItemTable';
import { Item } from '@/types/itemType';
import { useListItems } from '@/app/features/lists/useListItems';


type EditPriceArgs = {
    itemId: Item["id"];
    newPrice: Item["price"];
};

function ListPage() {
    const params = useParams();
    const listId = Number(params.id);

    const {
        error,
        items,
        listName,
        updatePrice,
        deleteItem,
        handleUpdateAllPrices,
        priceDiffMap,
        refetchItems,
        setSearchText,
        searchText,
        totalCount
    } =
        useListItems(listId);

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
                    <Stack direction='row'>
                        <Heading size='l'>{listName}</Heading>
                        <Counter
                            currentValue={totalCount}
                            minValue={0}
                            maxValue={50}
                        ></Counter>
                    </Stack>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            width: 300
                        }}
                    >
                        <Input
                            placeholder="Search item"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                        />
                    </div>
                    <Stack
                        direction='row'
                        gap={300}
                    >
                        <Button
                            onClick={() => handleUpdateAllPrices()}>
                            Update all price
                        </Button>
                    </Stack>
                </RowWithSpaceBetween>
                <ItemTable
                    tableData={items}
                    listId={listId}
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