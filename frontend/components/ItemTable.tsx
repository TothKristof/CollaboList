import { Item } from '@/types/itemType'
import { Table, TableColumnDef, Tooltip } from '@kinsta/stratus'
import { categories } from '@/data/categories'

interface TableProps {
    tableData: Item[];
}

function ItemTable({ tableData }: TableProps) {
    const columns: TableColumnDef<Item>[] = [
        {
            id: "category",
            header: "",
            cell: ({ row }) => {
                const categoryKey = row.original.category;

                if (!categoryKey) return null;

                const Icon = categories[categoryKey].icon;

                return (
                    <Tooltip content={`${categoryKey} category`}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon size={24} />
                        </div>
                    </Tooltip>
                );
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
            accessorKey: 'lastUpdated',
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
            accessorKey: 'price',
            cell: ({ row }) => `${row.original.price} HUF`,
        },
    ]
    return (
        <Table<Item>
            columns={columns}
            data={tableData}
            rowKey="id"
        />
    )
}

export default ItemTable