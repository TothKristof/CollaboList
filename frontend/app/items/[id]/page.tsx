"use client"
import { useItems } from "@/app/features/items/useItems";
import { Item } from "@/types/itemType";
import { useParams } from "next/navigation";
import { PageWrapper, TopRow, Panel, ItemNameHeader, ItemNumber } from "./item.styles";
import { Stack } from "@kinsta/stratus";
import { ItemDetails } from "@/components/ItemDetails";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomToaster from "@/components/CustomToaster";

function ItemPage() {
    const params = useParams();
    const itemId = Number(params.id);
    const { item, getItemError } = useItems(itemId)

    if (!item) {
        return (
            <PageWrapper>
                {getItemError && (
                    <CustomToaster
                        isOpen={getItemError !== undefined}
                        text={getItemError.message}
                        title="Get item error"
                        type="error"
                    />
                )}
                <div>Item is not available.</div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            {getItemError && (
                <CustomToaster
                    isOpen={getItemError !== undefined}
                    text={getItemError.message}
                    title="Get item error"
                    type="error"
                />
            )}
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
            <Panel>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={item.priceHistory}>
                        <XAxis dataKey="recordedAt" />
                        <YAxis />
                        <Tooltip formatter={(value) => value.toLocaleString('hu-HU') + ' Ft'} />
                        <Area type="monotone" dataKey="price" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </Panel>
        </PageWrapper>
    );
}

export default ItemPage;