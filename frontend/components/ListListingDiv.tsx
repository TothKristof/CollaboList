import { Modal, Input, AutoComplete, Button } from '@kinsta/stratus'
import styled from "@emotion/styled";
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { List } from '@/types/listType';

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

interface ListsDivProps {
    lists: List[]
}


function ListListingDiv({ lists }: ListsDivProps) {
    const [isVisible, setIsVisible] = useState(false)
    const categoryList = Object.keys(categories)

    const hasLists = lists.length > 0
    const isScrollable = lists.length > 5

    return (
        <>
            <ListsDiv scrollable={isScrollable}>
                <ListDiv onClick={() => setIsVisible(true)}>
                    <Plus size={48} />
                </ListDiv>
                {!hasLists && (
                    <EmptyState>
                        You don’t have any lists yet.
                    </EmptyState>
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
                onOk={() => setIsVisible(false)}
                okText="Add new list"
                onCancel={() => setIsVisible(false)}
            >
                <FormDiv>
                    <Input
                        label="List name"
                        placeholder="Type something"
                    />
                    <AutoComplete
                        label="List items category (optional)"
                        searchIndex={categoryList}
                    />
                </FormDiv>
            </Modal>
        </>
    )
}


export default ListListingDiv