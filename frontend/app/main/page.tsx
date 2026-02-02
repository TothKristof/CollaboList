"use client"

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import {
  PageWrapper,
  ContentWrapper,
  MainColumn,
  RightColumn,
} from "./main.styles";
import RecentlyAddedItemDiv from '@/components/RecentlyAddedItemDiv';
import { items } from '@/data/items';
import { CustomCard } from '../global.styles';
import ListListingDiv from '@/components/ListListingDiv';
import PieChartComponent from '@/components/PieChart';
import { Item } from '@/types/itemType';
import { lists } from '@/data/lists';


function page() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  const userItems: Item[] = items.filter(item => item.ownerId === user?.id);
  const userLists = lists.filter((list) => list.ownerId == user?.id)

  return (
    <PageWrapper>
      <ContentWrapper>
        <MainColumn>
          {/* <CardRow>
            <Card />
          </CardRow> */}
          <ListListingDiv lists = {lists}></ListListingDiv>
          <RecentlyAddedItemDiv items={userItems}></RecentlyAddedItemDiv>
        </MainColumn>

        <RightColumn>
          <CustomCard >
            <PieChartComponent></PieChartComponent>
          </CustomCard>
          <CustomCard />
          <CustomCard />
        </RightColumn>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default page