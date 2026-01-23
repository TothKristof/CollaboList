import React from 'react'
import styled from "@emotion/styled";
import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading, Table } from '@kinsta/stratus';
import { Item } from '@/types/itemType';
import type {
  TableColumnDef,
} from '@kinsta/stratus'

const RecentlyAddedItems = styled.div({
    height: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20
});

type Props = {
    items: Item[];
};

function RecentlyAddedItemDiv({ items }: Props) {
    const sortedItems = items
        .slice()
        .sort((a, b) => b.addDate.getTime() - a.addDate.getTime())

    const columns: TableColumnDef<Item>[] = [
        {
            id: 'category',
            header: '',
            cell: ({ row }) => {
                const Icon = row.original.category?.icon

                return Icon ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon color="black" size={16} />
                    </div>
                ) : null
            },
        },
        
        {
            id: 'name',
            header: 'Name',
            accessorKey: 'name',
        },
        {
            id: 'lastUpdated',
            header: 'Last updated',
            cell: ({ row }) =>
                row.original.lastUpdatedDate.toDateString(),
        },
        {
            id: 'added',
            header: 'Added',
            cell: ({ row }) =>
                row.original.addDate.toDateString(),
        },
        {
            id: 'price',
            header: 'Price',
            cell: ({ row }) => `${row.original.price} HUF`,
        },
    ]
    return (
        <RecentlyAddedItems>
            <RowWithSpaceBetween>
                <Heading size='l'>Recently Added Items</Heading>
                <div>Search placeholder</div>
                <div>hy</div>
            </RowWithSpaceBetween>
            <Table<Item>
                columns={columns}
                data={sortedItems}
            />
        </RecentlyAddedItems>
    )
}

export default RecentlyAddedItemDiv