"use client";
import Brand from '../components/Brand';
import {
  PageWrapper,
  NavContainer,
  HeroContainer,
  MarketingTextsDiv,
  PictureDiv,
  FeatureCardDiv
} from './home.styles';
import Link from 'next/link'
import { Heading, Button, Stack, Card } from '@kinsta/stratus';
import Image from 'next/image'
import { Features } from '@/data/features';
import { css } from '@emotion/react';

export default function Home() {
  return (
    <PageWrapper>
      <NavContainer>
        <Brand />
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </NavContainer>
      <HeroContainer>
        <MarketingTextsDiv>
          <Heading>Organize your wishes. Buy smarter.</Heading>
          <Heading size='xs'>Create wishlists, set priorities,<br /> and track prices — all in one simple place.</Heading>
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
        {Features.map((feature, index) => (
          <Card key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </FeatureCardDiv>
    </PageWrapper>
  );
}
