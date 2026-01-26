"use client"
import { useParams } from 'next/navigation'
import { lists } from '@/data/lists';
import { List } from '@/types/listType';
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';
import { Heading } from '@kinsta/stratus';
import ItemTable from '@/components/ItemTable';
import { useState } from 'react';
import { Item } from '@/types/itemType';

type EditPriceArgs = {
    itemId: Item["id"];
    newPrice: Item["price"];
};

function page() {
    let params = useParams();
    const listId = Number(params.id);
    const list = lists.find((l: List) => l.id === listId)
    const [items, setItems] = useState<Item[]>(list?.items)

    if (!list) {
        return <div>List not found</div>
    }

    function editPrice({
        itemId,
        newPrice,
    }: EditPriceArgs) {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, price: newPrice }
                    : item
            )
        );
    }

    function deleteItem(itemId: number) {
        setItems(items =>
            items.filter(item => item.id !== itemId)
        );
    }

    return (
        <CenterContentDiv>
            <ListDiv>
                <RowWithSpaceBetween>
                    <Heading size='l'>{list.name}</Heading>
                    <div>Item count: {items?.length}</div>
                </RowWithSpaceBetween>
                <ItemTable
                    tableData={items}
                    actions={{
                        onEditPrice: (item) => {
                            editPrice({ itemId: item.id, newPrice: item.price });
                        },
                        onDelete: (item) => {
                            deleteItem(item.id);
                        },
                    }}
                />
            </ListDiv>
        </CenterContentDiv>
    )
}

export default page