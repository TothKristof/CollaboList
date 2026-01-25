"use client"

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Brand from '@/components/Brand';
import { Stack, Avatar} from '@kinsta/stratus';
import {
  PageWrapper,
  Sidebar,
  ContentWrapper,
  MainColumn,
  RightColumn,
  CardRow,
} from "./main.styles";
import { RowWithSpaceBetween } from '../global.styles';
import RecentlyAddedItemDiv from '@/components/RecentlyAddedItemDiv';
import { items } from '@/data/items';
import { Card } from '../global.styles';
import ListListingDiv from '@/components/ListListingDiv';


function page() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  return (
    <PageWrapper>
      <RowWithSpaceBetween>
        <Brand></Brand>
        <Stack direction='row' >
          <div>{user?.email}</div>
          <Avatar></Avatar>
        </Stack>
      </RowWithSpaceBetween>

      <ContentWrapper>
        <MainColumn>
          {/* <CardRow>
            <Card />
          </CardRow> */}
          <ListListingDiv></ListListingDiv>
          <RecentlyAddedItemDiv items = {items}></RecentlyAddedItemDiv>
        </MainColumn>

        <RightColumn>
          <Card />
          <Card />
          <Card />
        </RightColumn>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default page