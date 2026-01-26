import styled from "@emotion/styled";
import { RowWithSpaceBetween } from '@/app/global.styles'
import { Heading} from '@kinsta/stratus';
import { Item } from '@/types/itemType';
import ItemTable from './ItemTable';

const RecentlyAddedItems = styled.div({
    height: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20
});

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
            <ItemTable tableData={items}></ItemTable>
        </RecentlyAddedItems>
    )
}

export default RecentlyAddedItemDiv