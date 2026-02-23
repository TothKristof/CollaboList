import styled from "@emotion/styled";
import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading, space } from '@kinsta/stratus';
import { Item } from '@/types/itemType';
import ItemTable from './ItemTable';

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
    const sortedItems = items
        .slice()
        .sort((a, b) => b.addDate.getTime() - a.addDate.getTime())

    return (
        <RecentlyAddedItems>
            <RowWithSpaceBetween>
                <Heading size='l'>Recently Added Items</Heading>
            </RowWithSpaceBetween>
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ItemTable tableData={sortedItems}></ItemTable>
            </div>
        </RecentlyAddedItems>
    )
}

export default RecentlyAddedItemDiv