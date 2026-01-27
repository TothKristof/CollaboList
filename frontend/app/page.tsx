"use client";
import Brand from '../components/Brand';
import {
  HeroContainer,
  MarketingTextsDiv,
  FeatureCardDiv,
  CustomCard,
  Header,
  TitleWrapper,
  IconCircle,
  Title,
  Subtitle,
  DiscountBadge,
  ChartContainer,
  ChartBars,
  Bar,
  Footer,
  OldPrice,
  NewPrice,
  GraphDiv,
  AlertCard,
  AlertIconWrapper,
  AlertTitle,
  AlertText
} from './home.styles';
import Link from 'next/link'
import { Button, Card, Display, color } from '@kinsta/stratus';
import { features } from '@/data/features';
import { RowWithSpaceBetween, CenterContentDiv } from './global.styles';
import { useAuth } from '@/context/authContext';
import { ShoppingBag, Bell } from 'lucide-react';


export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <CenterContentDiv>
      <RowWithSpaceBetween>
        <Brand />
        {isAuthenticated ? (
          <Link href="/main">
            <Button>Sign in</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        )}

      </RowWithSpaceBetween>
      <HeroContainer>
        <MarketingTextsDiv>
          <Display size='l'>Organize your wishes. Buy smarter.</Display>
          <Display size='xs' >Create wishlists, set priorities,<br /> and track prices — all in one simple place.</Display>
        </MarketingTextsDiv>
        <GraphDiv >
          {/* Main Card */}
          <CustomCard>
            <Header>
              <TitleWrapper>
                <IconCircle>
                  <ShoppingBag size={20} color={`${color.anthracite}`} />
                </IconCircle>
                <div>
                  <Title>Sony WH-1000XM5</Title>
                  <Subtitle>Added 2 days ago</Subtitle>
                </div>
              </TitleWrapper>

              <DiscountBadge>-20% OFF</DiscountBadge>
            </Header>

            <ChartContainer>
              <ChartBars>
                {[40, 35, 55, 45, 60, 50, 30].map((h, i) => (
                  <Bar
                    key={i}
                    highlight={i === 6}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      duration: 0.5,
                    }}
                  />
                ))}
              </ChartBars>
            </ChartContainer>

            <Footer>
              <div>
                <OldPrice>$348.00</OldPrice>
                <NewPrice>$279.00</NewPrice>
              </div>

              <Button >Buy Now</Button>
            </Footer>
          </CustomCard>

          {/* Floating Notification Card */}
          <AlertCard
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.2,
              type: "spring",
            }}
          >
            <AlertIconWrapper>
              <Bell size={20} color="#ea580c" />
            </AlertIconWrapper>

            <div>
              <AlertTitle>Price Drop Alert!</AlertTitle>
              <AlertText>
                AirPods Pro just dropped to lowest price ever.
              </AlertText>
            </div>
          </AlertCard>
        </GraphDiv>
      </HeroContainer>
      <FeatureCardDiv>
        {features.map((feature, index) => (
          <Card key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </FeatureCardDiv>
    </CenterContentDiv>
  );
}
