import { Modal, Input, AutoComplete, Button } from '@kinsta/stratus'
import styled from "@emotion/styled";
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { lists } from '@/data/lists';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

const ListsDiv = styled.div((props) => ({
    display: 'flex',
    height: 200,
    width: '100%',
    borderRadius: 16,
    padding: 10,
    flexShrink: 0,
    background: props.theme.colors.accent,
    gap: 10,
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
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


function ListListingDiv() {
    const [isVisible, setIsVisible] = useState(false)
    const categoryList = Object.keys(categories);
    const {user} = useAuth() 
    const userLists = lists.filter((list) => list.ownerId == user?.id) 
    return (
        <>
            <ListsDiv>
                <ListDiv onClick={() => setIsVisible(!isVisible)}>
                    <Plus size={48}></Plus>
                </ListDiv>
                {userLists.map((list, index) => {
                    const Icon = categories[list.category].icon;
                    const color = categories[list.category].color;
                    return (
                        <ListLink key={list.id} href={`/lists/${list.id}`}>
                            <ListDiv>
                                <Icon size={32} color={color}/>
                                <div>{list.name}</div>
                            </ListDiv>
                        </ListLink>
                    );
                })}
            </ListsDiv>
            <Modal
                isVisible={isVisible}
                title="Add new list" isClosable={true}
                onOk={() => setIsVisible(!isVisible)}
                okText={'Add new list'}
                onCancel={() => setIsVisible(!isVisible)}
            >
                <FormDiv>
                    <Input
                        label={'List name'}
                        placeholder="Type something"
                    />
                    <AutoComplete
                        label={'List items category (optional)'}
                        searchIndex={categoryList}
                    >

                    </AutoComplete>
                </FormDiv>
            </Modal>
        </>
    )
}

export default ListListingDiv