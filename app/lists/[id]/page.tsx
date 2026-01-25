"use client"
import { useParams } from 'next/navigation'
import { lists } from '@/data/lists';
import { List } from '@/types/listType';
import { ListDiv } from './list.styles';
import { CenterContentDiv, RowWithSpaceBetween } from '@/app/global.styles';
import { Heading } from '@kinsta/stratus';

function page() {
    let params = useParams();
    const listId = Number(params.id);
    const list = lists.find((l: List) => l.id === listId)

    if (!list) {
        return <div>Lista nem található</div>
    }

    return (
        <CenterContentDiv>
            <ListDiv>
                <RowWithSpaceBetween>
                    <Heading size='l'>{list.name}</Heading>
                    <div>Item count: {list.items.length}</div>
                </RowWithSpaceBetween>
            </ListDiv>
        </CenterContentDiv>
    )
}

export default page