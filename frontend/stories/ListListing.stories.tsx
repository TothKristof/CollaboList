import type { Meta, StoryObj } from '@storybook/react'
import ListListingDiv from '@/components/ListListingDiv'
import { lists } from '@/data/lists'

const meta: Meta<typeof ListListingDiv> = {
  title: 'Components/ListListing',
  component: ListListingDiv,
}

export default meta

type Story = StoryObj<typeof ListListingDiv>

export const Empty: Story = {
  args: {
    lists: [],
  },
}

export const FewLists: Story = {
  args: {
    lists: lists.slice(0, 2),
  },
}

export const AllList: Story = {
  args: {
    lists,
  },
}
