import { Modal, Select, Tag, Avatar, AutoComplete, Stack } from "@kinsta/stratus";
import type { User } from "@/types/userType";
import { useEffect, useState } from "react";
import { ASSIGNABLE_LIST_ROLES } from '@/data/listRoles';
import { AssignableListRole } from '@/data/listRoles';
import { useListItems } from '@/app/features/lists/useListItems';
import useFetchMembers from '@/app/features/lists/fetchMembers';
import { RowWithSpaceBetween } from '@/app/global.styles'
import useUserSearch from '@/app/features/lists/userSearch';
import CustomToaster from "./ErrorToaster";

interface AddNewMemberProps {
    isVisible: boolean,
    setIsVisible: (e: boolean) => void,
    listId: number
}

function AddMemberModal({ isVisible, setIsVisible, listId }: AddNewMemberProps) {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedRole, setSelectedRole] = useState<AssignableListRole>("GUEST")

    const { addNewMember, addMemberError } = useListItems(listId);

    const { setUserSearchText, users } = useUserSearch()
    const { fetchUsers, members, refetch } = useFetchMembers()

    const handleAddMember = async () => {
        if (!selectedUserId || !selectedRole) return;
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
        refetch();
    };

    useEffect(() => {
        fetchUsers({ variables: { listId } });
    }, [isVisible])

    return (
        <Modal
            isVisible={isVisible}
            title="Add new member"
            isClosable
            onOk={handleAddMember}
            okText="Add"
            onCancel={() => setIsVisible(false)}
            width={500}
        >
            <RowWithSpaceBetween>
                {console.log(users)}
                <AutoComplete
                    label="Search user"
                    results={users}
                    searchIndex={users}
                    placeholder="Search by name or email..."
                    getDisplayName={(user) => user.email}
                    renderItem={(user: User) => (
                        <div key={user.id}>
                            <strong>{user.username}</strong> — {user.email}
                        </div>
                    )}
                    customSearchMethod={(query, items) => {
                        setUserSearchText(query);
                        return items;
                    }}
                    onSelect={(user) => setSelectedUserId(user.id)}
                />
                <Select
                    width={300}
                    label="Select role"
                    placeholder='Select role'
                    onChange={(value) => setSelectedRole(value as AssignableListRole)}
                >
                    {ASSIGNABLE_LIST_ROLES.map((listRole) => (
                        <Select.Option key={listRole} value={listRole}>{listRole}</Select.Option>
                    ))}
                </Select>
            </RowWithSpaceBetween>
            <Stack direction='column' gap={0}>
                <h5>Members</h5>
                <div className='scrollable'>
                    {members.map((member, index) => (
                        <RowWithSpaceBetween key={index}>
                            <Stack direction='row'>
                                <Avatar></Avatar>
                                <Stack direction='column' gap={25}>
                                    <span>{member.user.username}</span>
                                    <span style={{ color: 'grey' }}>{member.user.email}</span>
                                </Stack>
                            </Stack>
                            <Tag theme='neutral'>{member.role}</Tag>
                        </RowWithSpaceBetween>
                    ))}
                </div>
            </Stack>
            {addMemberError &&
                <CustomToaster
                    isOpen={addMemberError !== undefined}
                    text={addMemberError.message}
                    title='Add member error'
                    type="error"
                ></CustomToaster>}
        </Modal>
    )
}

export default AddMemberModal