import type { Item } from '@/types/itemType'
import { Heading, Stack, borderRadius, space } from '@kinsta/stratus'
import { categories } from '@/data/categories';
import styled from "@emotion/styled";

const IconDiv = styled.div((props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius[50],
    border: 'solid 2px black',
    padding: space[150],
    width: '50px',
    height: '50px'
}));

const CardDiv = styled(Stack)({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    padding: space[250]
})

function ItemCard({ item }: { item: Item }) {
    const category = categories[item.category]
    const Icon = category.icon
    const color = category.color

    return (
        <CardDiv
            direction="column"
            style={{
                background: `linear-gradient(180deg, rgba(255,255,255,1) 50%, ${color} 100%)`,
            }}
        >
            <IconDiv>
                <Icon size={32} color={color} />
            </IconDiv>
            <Heading size='s'>{item.name}</Heading>

        </CardDiv>
    )
}

export default ItemCard