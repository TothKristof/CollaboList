"use client"

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Brand from '@/components/Brand';
import {
  PageWrapper,
  ContentWrapper,
  MainColumn,
  RightColumn,
} from "./main.styles";
import { RowWithSpaceBetween } from '../global.styles';
import RecentlyAddedItemDiv from '@/components/RecentlyAddedItemDiv';
import { items } from '@/data/items';
import { CustomCard } from '../global.styles';
import ListListingDiv from '@/components/ListListingDiv';
import { UserMenu } from '@/components/UserMenu';
import PieChartComponent from '@/components/PieChart';


function page() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  return (
    <PageWrapper>
      <RowWithSpaceBetween>
        <Brand></Brand>
        <UserMenu email={user?.email}></UserMenu>
      </RowWithSpaceBetween>

      <ContentWrapper>
        <MainColumn>
          {/* <CardRow>
            <Card />
          </CardRow> */}
          <ListListingDiv></ListListingDiv>
          <RecentlyAddedItemDiv items={items}></RecentlyAddedItemDiv>
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