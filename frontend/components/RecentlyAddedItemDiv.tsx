import styled from "@emotion/styled";
import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading, space } from '@kinsta/stratus';
import { Item } from '@/types/itemType';
import ItemCard from "./ItemCard";
import NoData from "./NoData";

const ItemGridContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(2, auto)",
  gap: "16px",
  height: "90%",
});

const RecentlyAddedItems = styled.div((props) => ({
    height: '100%',
    background: props.theme.colors.accent,
    borderRadius: 16,
    padding: space[250]
}));

type Props = {
    items: Item[];
};

function RecentlyAddedItemDiv({ items }: Props) {
    return (
        <RecentlyAddedItems>
            <RowWithSpaceBetween>
                <Heading size='l'>Recently Added Items</Heading>
            </RowWithSpaceBetween>
            <ItemGridContainer>
                {items.length == 0 && <NoData></NoData>}
                {items.map((item, index) => (
                    <ItemCard item={item} key={index}></ItemCard>
                ))}
            </ItemGridContainer>
        </RecentlyAddedItems>
    )
}

export default RecentlyAddedItemDiv