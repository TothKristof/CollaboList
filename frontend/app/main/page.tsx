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
import useHomeInformations from '../features/home/useHomeInformations';

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
    const { loading, error, items, lists } =
      useHomeInformations();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <PageWrapper>
      {(lists && items) && (
        <ContentWrapper>
          <MainColumn>
            <ListListingDiv lists={lists} />
            <RecentlyAddedItemDiv items={items} />
          </MainColumn>

          <RightColumn>
            <CustomCard >
              <PieChartComponent lists={lists}></PieChartComponent>
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