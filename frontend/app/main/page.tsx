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
import useHomeInformations from '../features/home/useHomeInformations';
import RecentActivity from "@/components/RecentActivity";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";
import Loading from "@/components/Loading";
import CustomToaster from "@/components/CustomToaster";

function page() {
  const pathname = usePathname()
  const { items, lists, activities, refetch, loading, userDatasError } =
    useHomeInformations();

  useEffect(() => {
    if (pathname === '/main') {
      refetch()
    }
  }, [pathname])

  if(loading){
    return <Loading></Loading>
  }

  return (
    <PageWrapper>
      {userDatasError && (
        <CustomToaster
          isOpen={userDatasError !== undefined}
          text={userDatasError.message}
          title="Get user data error"
          type="error"
        />
      )}
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