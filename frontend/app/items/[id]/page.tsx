"use client"
import { useItems } from "@/app/features/items/useItems";
import { Item } from "@/types/itemType";
import { useParams } from "next/navigation";
import { PageWrapper, TopRow, Panel, ItemNameHeader, ItemNumber } from "./item.styles";
import { Stack } from "@kinsta/stratus";
import { ItemDetails } from "@/components/ItemDetails";

// const GraphPanel = styled(Panel)({
//     width: '100%',
//     minHeight: 450,
// });

function ItemPage() {
    const params = useParams();
    const itemId = Number(params.id);
    const { item } = useItems(itemId)

    if (!item) {
        return "hy"
    }

    return (
        <PageWrapper>
            <div>
                <ItemNameHeader>{item.name}</ItemNameHeader>
                <ItemNumber className="text-slate-500 mt-2 text-sm sm:text-base font-medium">
                    Item ID: #{item.id.toString().padStart(4, '0')}
                </ItemNumber>
            </div>
            <TopRow>
                <Panel>
                    <img
                        src={item.imgLink}
                        alt="Item"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Panel>

                <Panel>
                    <ItemDetails item={item}></ItemDetails>
                </Panel>
            </TopRow>
        </PageWrapper>
    );
}

export default ItemPage;