"use client";
import Brand from '../components/Brand';
import {
  HeroContainer,
  MarketingTextsDiv,
  PictureDiv,
  FeatureCardDiv
} from './home.styles';
import Link from 'next/link'
import { Heading, Button, Card, Display } from '@kinsta/stratus';
import Image from 'next/image'
import { features } from '@/data/features';
import { RowWithSpaceBetween, CenterContentDiv } from './global.styles';
import { useAuth } from '@/context/authContext';

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
          <Display size='xl'>Organize your wishes. Buy smarter.</Display>
          <Display size='xs' >Create wishlists, set priorities,<br /> and track prices — all in one simple place.</Display>
        </MarketingTextsDiv>
        <PictureDiv>
          <Image
            fill
            src="/list.jpg"
            alt='Picture of a list'
          />
        </PictureDiv>
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
