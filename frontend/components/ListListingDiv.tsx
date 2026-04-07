import { Modal, Input, AutoComplete, Button, Stack, ActionBox } from '@kinsta/stratus'
import styled from "@emotion/styled";
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import Link from 'next/link';
import { List } from '@/types/listType';
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import NoData from './NoData';
import useListAdd from '@/app/features/lists/useListAdd';
import CustomToaster from './CustomToaster';

const ListsDiv = styled.div<{ scrollable: boolean }>((props) => ({
    display: 'flex',
    height: 200,
    width: '100%',
    borderRadius: 16,
    padding: 10,
    flexShrink: 0,
    background: props.theme.colors.accent,
    gap: 10,
    overflowX: props.scrollable ? 'auto' : 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: props.scrollable ? 'auto' : 'none',
}));

const EmptyState = styled.div((props) => ({
    margin: 'auto 0px',
    fontSize: 18,
    color: props.theme.colors.text,
}));

const ListDiv = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
    flexShrink: 0,
    borderRadius: 16,
    padding: 10,
    background: props.theme.colors.background,
    color: props.theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    border: `solid 4px ${props.theme.colors.text}`,
    cursor: 'pointer'
}));

const FormDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 300,
    margin: 'auto'
});


const ListLink = styled(Link)({
    display: 'flex',
    textDecoration: 'none',
});

const Divider = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: 300,
    margin: 'auto',
    '&::before, &::after': {
        content: '""',
        flex: 1,
        height: 1,
        background: '#e2e8f0',
    }
});

const InvitationWrapper = styled.div({
    width: 300,
    margin: 'auto',
});

interface ListsDivProps {
    lists: List[]
}

function ListListingDiv({ lists }: ListsDivProps) {
    const [isVisible, setIsVisible] = useState(false)
    const categoryList = Object.keys(categories)
    const [newListName, setNewListName] = useState("")
    const [newListCategory, setNewListCategory] = useState("")
    const [invitationLink, setInvitationLink] = useState("")
    const { addList, addListError, acceptInvitation, acceptInvitationError } = useListAdd()

    const hasLists = lists.length > 0
    const isScrollable = lists.length > 5

    return (
        <>
            {addListError && (
                <CustomToaster
                    isOpen={addListError !== undefined}
                    text={addListError.message}
                    title="Add list error"
                    type="error"
                />
            )}
            {acceptInvitationError && (
                <CustomToaster
                    isOpen={acceptInvitationError !== undefined}
                    text={acceptInvitationError.message}
                    title="Accept invitation error"
                    type="error"
                />
            )}
            <ListsDiv scrollable={isScrollable}>
                <ListDiv onClick={() => setIsVisible(true)}>
                    <Plus size={48} />
                </ListDiv>
                {!hasLists && (
                    <NoData></NoData>
                )}

                {hasLists && (
                    <>

                        {lists.map((list) => {
                            const category = categories[list.category]
                            if (!category) return null

                            const Icon = category.icon
                            const color = category.color

                            return (
                                <ListLink key={list.id} href={`/lists/${list.id}`}>
                                    <ListDiv>
                                        <Icon size={32} color={color} />
                                        <div>{list.name}</div>
                                    </ListDiv>
                                </ListLink>
                            )
                        })}
                    </>
                )}
            </ListsDiv>

            <Modal
                isVisible={isVisible}
                title="Add new list"
                isClosable
                onOk={async () => {
                    setIsVisible(false)
                    if (invitationLink) {
                        await acceptInvitation({
                            variables: {
                                token: invitationLink
                            }
                        })
                    } else {
                        await addList({
                            variables: {
                                name: newListName,
                                category: newListCategory,
                            },
                        });
                    }
                }}
                okText="Add new list"
                onCancel={() => setIsVisible(false)}
            >
                <Stack gap={150}>
                    <FormDiv>
                        <Input
                            label="List name"
                            placeholder="Type something"
                            value={newListName}
                            onChange={(e) => {
                                setInvitationLink("")
                                setNewListName(e.target.value)
                            }}
                        />
                        <AutoComplete
                            label="List items category (optional)"
                            searchIndex={categoryList}
                            value={newListCategory}
                            onChange={(e) => {
                                setInvitationLink("")
                                setNewListCategory(e)
                            }}
                        />
                    </FormDiv>

                    <Divider>Or</Divider>

                    <InvitationWrapper>
                        <ActionBox
                            action={{
                                icon: 'File',
                                tooltip: 'Paste invitation link',
                                onClick: async () => {
                                    setNewListName("")
                                    setNewListCategory("")
                                    const text = await navigator.clipboard.readText();
                                    setInvitationLink(text);
                                }
                            }}
                            label="Invitation link"
                            text={invitationLink}
                            tooltip="Paste invitation link"
                        />
                    </InvitationWrapper>
                </Stack>
            </Modal>
        </>
    )
}


export default ListListingDiv