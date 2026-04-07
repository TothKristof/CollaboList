"use client"
import { useParams } from 'next/navigation'
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';

import ItemTable from '@/components/ItemTable';
import { Item } from '@/types/itemType';
import { useListItems } from '@/app/features/lists/useListItems';
import ListHeader from '@/components/ListHeader';
import CustomToaster from '@/components/CustomToaster';


type EditPriceArgs = {
    itemId: Item["id"];
    newPrice: Item["price"];
};

function ListPage() {
    const params = useParams();
    const listId = Number(params.id);

    const {
        getListItemsError,
        items,
        updatePrice,
        deleteItem,
        priceDiffMap,

    } =
        useListItems(listId);

    function editPrice({
        itemId,
        newPrice,
    }: EditPriceArgs) {
        updatePrice({ variables: { itemId: itemId, newPrice: newPrice } })
    }

    return (
        <CenterContentDiv>
            {getListItemsError && (
                <CustomToaster
                    isOpen={getListItemsError !== undefined}
                    text={getListItemsError.message}
                    title="Get list items error"
                    type="error"
                />
            )}
            <ListDiv>
                <ListHeader listId={listId}></ListHeader>
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