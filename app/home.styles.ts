import styled from '@emotion/styled';
import { breakpoints, borderRadius, color } from '@kinsta/stratus'

export const PageWrapper = styled.div({
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
  maxWidth: '1400px',
  alignItems: 'center',
  marginTop: '50px',
  justifyItems: 'center',
  textAlign: 'center',
  [breakpoints.m.up]: {
    display: 'flex',
    textAlign: 'left',
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
  fontSize: '50px',
  [breakpoints.m.up]: {
    textAlign: 'left',
  },
  [breakpoints.xl.up]: {
    fontSize: '95px',
    gap: '0px'
  },
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

export const FeatureCardDiv = styled.div({
  display: 'grid',
  gap: '16px',
  color: color.anthracite,
  marginTop: '50px',
  [breakpoints.m.up]: {
    display: 'flex',
    textAlign: 'left',
  },
});
