import { Item } from '@/types/itemType'
import { Button, Input, Stack, Table, TableColumnDef, Tooltip } from '@kinsta/stratus'
import { categories } from '@/data/categories'
import { Check, Edit, Globe, Icon, Trash } from 'lucide-react';
import { useState } from 'react';

interface TableProps {
    tableData: Item[];
    actions?: {
        onEditPrice: (item: Item) => void;
        onDelete: (item: Item) => void;
    };
}


function ItemTable({ tableData, actions }: TableProps) {
    const [editedItemId, setEditedItemId] = useState<number | null>(null);
    const [editedPrice, setEditedPrice] = useState<number>(0);
    const columns: TableColumnDef<Item>[] = [
        {
            id: "category",
            header: "",
            cell: ({ row }) => {
                const categoryKey = row.original.category;

                if (!categoryKey) return null;

                const Icon = categories[categoryKey].icon;
                const color = categories[categoryKey].color;
                return (
                    <Tooltip content={`${categoryKey} category`}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon size={24}  color={color}/>
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
            cell: ({ row }) => {
                const item = row.original;
                setEditedPrice(item.price);
                if (editedItemId == item.id) {
                    return (
                        <Stack direction='row'>
                            <input
                                type="number"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(Number(e.target.value))}
                            />
                            <Button
                                onClick={() => {
                                    actions?.onEditPrice({
                                        ...item,
                                        price: editedPrice,
                                    });
                                    setEditedItemId(null);
                                }}
                            >
                                <Check size={18}></Check>
                            </Button>
                        </Stack>
                    )
                }
                return `${row.original.price} HUF`
            },
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const item = row.original;

                if (!actions) {
                    return null;
                }

                return (
                    <div style={{ display: "flex", gap: 8 }}>

                        {/* External link */}
                        <Tooltip content="Check price on web">
                            <Button
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe size={18}></Globe>
                            </Button>
                        </Tooltip>

                        {/* Edit price */}
                        <Tooltip content="Edit price">
                            <Button
                                type='secondary'
                                onClick={() => setEditedItemId(item.id)}
                            >
                                <Edit size={18}></Edit>
                            </Button>
                        </Tooltip>

                        {/* Delete */}
                        <Tooltip content="Delete item">
                            <Button
                                type='danger'
                                onClick={() => actions?.onDelete(item)}
                            >
                                <Trash size={18}></Trash>
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
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