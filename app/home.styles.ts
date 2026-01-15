import styled from '@emotion/styled';
import { breakpoints, borderRadius } from '@kinsta/stratus'

export const PageWrapper = styled.div({
  width: '100%',
  height: '100%',
  padding: '24px',
  boxSizing: 'border-box',
  justifyContent: 'center',
  justifyItems: 'center',
});

export const NavContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

export const HeroContainer = styled.div({
  display: 'grid',
  gap: '16px',
  justifyContent: 'space-around',
  maxWidth: '1400px',
  width: '100%',
  alignItems: 'center',
  marginTop: '50px',
  marginBottom: 'auto',
  justifyItems: 'center',
  textAlign: 'center',
  fontSize: '50px',
  [breakpoints.m.up]: {
    display: 'flex',
    textAlign: 'left',
  },
  [breakpoints.xl.up]: {
    fontSize: '95px',
    gap: '0px'
  },
});

export const MarketingTextsDiv = styled.div({
  display: 'grid',
  gap: '16px',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
});

export const PictureDiv = styled.div({
  position: 'relative',
  width: '300px',
  height: '300px',
  overflow: 'hidden',
  borderRadius: borderRadius.xl,
  [breakpoints.m.up]: {
    width: '500px',
    height: '500px',
  },
});
