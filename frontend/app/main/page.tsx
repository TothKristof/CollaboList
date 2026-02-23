"use client"

import { useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import {
  PageWrapper,
  ContentWrapper,
  MainColumn,
  RightColumn,
} from "./main.styles";
import RecentlyAddedItemDiv from '@/components/RecentlyAddedItemDiv';
import { CustomCard } from '../global.styles';
import ListListingDiv from '@/components/ListListingDiv';
import PieChartComponent from '@/components/PieChart';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Item } from '@/types/itemType';

const USER_DATAS = gql`
  query GetUserData{
      userData {
        items {
          id
          name
          price
          category
          link
          addDate
          lastUpdatedDate
          list {
            name
          }
        }
        lists {
          id
          category
          name
        }
      } 
  }
`;


function page() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { loading, error, data } = useQuery(USER_DATAS, {
    skip: !user
  });

  const lists = data?.userData?.lists ?? [];
  const items = data?.userData?.items ?? [];

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  const transformedItems = useMemo(() => {
    if (!data?.userData?.items) return [];

    return data.userData.items.map((item: Item) => ({
      ...item,
      addDate: new Date(Number(item.addDate)),
      lastUpdatedDate: new Date(Number(item.lastUpdatedDate)),
    }));
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <PageWrapper>
      {(lists && transformedItems) && (
        <ContentWrapper>
          <MainColumn>
            <ListListingDiv lists={data?.userData?.lists ?? []} />
            <RecentlyAddedItemDiv items={transformedItems} />
          </MainColumn>

          <RightColumn>
            <CustomCard >
              <PieChartComponent lists={data?.userData?.lists}></PieChartComponent>
            </CustomCard>
            <CustomCard />
            <CustomCard />
          </RightColumn>
        </ContentWrapper>
      )}
    </PageWrapper>
  )
}

export default page