"use client"
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
import useHomeInformations from '../features/home/useHomeInformations';
import RecentActivity from "@/components/RecentActivity";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";

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
  const pathname = usePathname()
  const {items, lists, activities, refetch } =
    useHomeInformations();

  useEffect(() => {
    if (pathname === '/main') {
      refetch()
    }
  }, [pathname])

  return (
    <PageWrapper>
      {(lists && items) && (
        <ContentWrapper>
          <MainColumn>
            <ListListingDiv lists={lists} />
            <RecentlyAddedItemDiv items={items} />
          </MainColumn>

          <RightColumn>
            <CustomCard style={{ flex: 1 }}>
              <PieChartComponent lists={lists} />
            </CustomCard>
            <CustomCard style={{ flex: 2 }} >
              <RecentActivity activities={activities}></RecentActivity>
            </CustomCard>
          </RightColumn>
        </ContentWrapper>
      )}
    </PageWrapper>
  )
}

export default page