import { Modal, Select, Tag, Avatar, AutoComplete, Stack, space } from "@kinsta/stratus";
import type { User } from "@/types/userType";
import { useEffect, useState } from "react";
import { ASSIGNABLE_LIST_ROLES } from '@/data/listRoles';
import { AssignableListRole } from '@/data/listRoles';
import { useListItems } from '@/app/features/lists/useListItems';
import useFetchMembers from '@/app/features/lists/fetchMembers';
import { RowWithSpaceBetween } from '@/app/global.styles'
import useUserSearch from '@/app/features/lists/userSearch';
import CustomToaster from "./ErrorToaster";
import { User as UserIcon, Users } from "lucide-react";
import styled from "@emotion/styled";

const RoleButton = styled.button({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 16px',
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
})

interface AddNewMemberProps {
    isVisible: boolean,
    setIsVisible: (e: boolean) => void,
    listId: number
}

function AddMemberModal({ isVisible, setIsVisible, listId }: AddNewMemberProps) {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedRole, setSelectedRole] = useState<AssignableListRole>("GUEST")

    const { addNewMember, addMemberError } = useListItems(listId);

    const { fetchUsers, members, refetch } = useFetchMembers()

    const roles: { value: AssignableListRole; label: string; icon: React.ReactNode }[] = [
        {
            value: 'GUEST',
            label: 'Guest',
            icon: <UserIcon size={32} />,
        },
        {
            value: 'COLLABORATOR',
            label: 'Collaborator',
            icon: <Users size={32} />,
        },
    ];

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
                <Stack direction="row" gap={50} style={{ width: '100%' }}>
                    {roles.map(({ value, label, icon }) => (
                        <RoleButton
                            key={value}
                            onClick={() => setSelectedRole(value)}
                            style={{
                                border: selectedRole === value ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                                background: selectedRole === value ? '#eff6ff' : '#f8fafc',
                                color: selectedRole === value ? '#1d4ed8' : '#64748b',
                            }}
                        >
                            {icon}
                            {label}
                        </RoleButton>
                    ))}
                </Stack>
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