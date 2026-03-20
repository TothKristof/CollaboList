import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading, Button, Stack, Input, Counter, Tooltip } from '@kinsta/stratus';
import { useListItems } from '@/app/features/lists/useListItems';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import AddMemberModal from './AddMemberModal';
import AddItemModal from './AddItemModal';

function ListHeader({ listId }: { listId: number }) {
    const [addMemberModalVisibility, setAddMemberModalVisibilty] = useState(false)
    const [addItemModalVisibility, setAddItemModalVisibilty] = useState(false)
    const {
        listName,
        handleUpdateAllPrices,
        setSearchText,
        searchText,
        totalCount
    } =
        useListItems(listId);

    return (
        <>
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
                        icon='ArrowsClockwise'
                        onClick={() => handleUpdateAllPrices()}>
                        Update all price
                    </Button>
                    <Button
                        icon='PersonAdd'
                        onClick={() => {
                            setAddMemberModalVisibilty(true)
                        }}>

                        Add member
                    </Button>
                    <Tooltip content="Add item">
                        <CirclePlus style={{ cursor: "pointer" }} onClick={() => setAddItemModalVisibilty(true)} size={30}></CirclePlus>
                    </Tooltip>
                </Stack>
            </RowWithSpaceBetween>
            <AddMemberModal isVisible={addMemberModalVisibility} setIsVisible={setAddMemberModalVisibilty} listId={listId}></AddMemberModal>
            <AddItemModal isVisible={addItemModalVisibility} setIsVisible={setAddItemModalVisibilty} listId={listId}></AddItemModal>
        </>
    )
}

export default ListHeader