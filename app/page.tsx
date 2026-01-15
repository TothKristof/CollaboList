"use client";
import Brand from '../components/Brand';
import {
  PageWrapper,
  NavContainer,
  HeroContainer,
  MarketingTextsDiv,
  PictureDiv
} from './home.styles';
import { Button } from '../components/Button';
import Link from 'next/link'
import { Heading } from '@kinsta/stratus';
import Image from 'next/image'

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
          <div>Organize your wishes. Buy smarter.</div>
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
    </PageWrapper>
  );
}
