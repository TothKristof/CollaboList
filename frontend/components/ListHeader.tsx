import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading, Button, Stack, Input, Counter, Select, SelectOp } from '@kinsta/stratus';
import { useListItems } from '@/app/features/lists/useListItems';
import { Modal, AutoComplete } from '@kinsta/stratus';
import { useState } from 'react';
import { ASSIGNABLE_LIST_ROLES } from '@/data/listRoles';
import { AssignableListRole } from '@/data/listRoles';

function ListHeader({ listId }: { listId: number }) {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedRole, setSelectedRole] = useState<AssignableListRole>("GUEST")
    const {
        listName,
        handleUpdateAllPrices,
        setSearchText,
        searchText,
        totalCount,
        addNewMember
    } =
        useListItems(listId);


    const handleAddMember = async () => {
        if (!selectedUserId) return;
        await addNewMember({
            variables: {
                listUser: {
                    listId,
                    userId: selectedUserId,
                    listRole: selectedRole
                }
            }
        });
        setIsVisible(false);
    };
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
                        onClick={() => handleUpdateAllPrices()}>
                        Update all price
                    </Button>
                    <Button onClick={() => setIsVisible(true)}>
                        Add new member
                    </Button>
                </Stack>
            </RowWithSpaceBetween>
            <Modal
                isVisible={isVisible}
                title="Add new member"
                isClosable
                onOk={handleAddMember}
                okText="Add"
                onCancel={() => setIsVisible(false)}
            >
                <Stack direction='column'>
                    <AutoComplete
                        label="Search user"
                        searchIndex={[]}
                        onChange={(e) => setSelectedUserId(e)}
                    />
                    <Select onChange={(value) => setSelectedRole(value as AssignableListRole)}>
                        {ASSIGNABLE_LIST_ROLES.map((listRole, index) => (
                            <Select.Option key={index} value={listRole}>{listRole}</Select.Option>
                        ))}
                    </Select>
                </Stack>
            </Modal>
        </>
    )
}

export default ListHeader