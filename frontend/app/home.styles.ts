import styled from '@emotion/styled';
import { breakpoints, borderRadius, color, space } from '@kinsta/stratus'
import { motion } from "motion/react";

export const HeroContainer = styled.div({
  display: 'grid',
  gap: space[200],
  maxWidth: '1400px',
  alignItems: 'center',
  marginTop: '50px',
  justifyItems: 'center',
  textAlign: 'center',
  [breakpoints.m.up]: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
});

export const MarketingTextsDiv = styled.div({
  display: 'grid',
  gap: space[400],
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
    gap: space[400]
  },
});

export const FeatureCardDiv = styled.div({
  display: 'grid',
  gap: space[200],
  color: color.anthracite,
  marginTop: '50px',
  [breakpoints.m.up]: {
    display: 'flex',
    textAlign: 'left',
  },
});

export const GraphDiv = styled.div({
  width: '100%',
  position: 'relative',
  [breakpoints.m.up]: {
    width: '50%'
  },
});

export const CustomCard = styled.div((props) =>({
  background: props.theme.colors.accent,
  borderRadius: borderRadius.l,
  border: '1px solid #f1f5f9',
  padding: '1.5rem',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  zIndex: 10,
}));

export const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
});

export const TitleWrapper = styled.div({
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
});

export const IconCircle = styled.div({
  width: '40px',
  height: '40px',
  borderRadius: borderRadius[50],
  background: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Title = styled.h3({
  fontWeight: 600,
  color: color.anthracite,
});

export const Subtitle = styled.p({
  fontSize: '0.875rem',
  color: color.text.neutral.subtle,
});

export const DiscountBadge = styled.span({
  padding: '0.25rem 0.75rem',
  borderRadius: borderRadius[50],
  background: color.bg.action.neutral.activeSubtlestConstant,
  color: color.text.positive.disabled,
  fontSize: '0.75rem',
  fontWeight: 700,
});

export const ChartContainer = styled.div({
  height: '12rem',
  background: '#f8fafc',
  borderRadius: borderRadius.m,
  marginBottom: '1.5rem',
  position: 'relative',
  overflow: 'hidden',
});

export const ChartBars = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'flex-end',
  gap: '0.5rem',
  padding: '1rem',
  opacity: 0.5,
});

export const Bar = styled(motion.div)<{ highlight?: boolean }>(({ highlight }) => ({
  flex: 1,
  borderRadius: `${borderRadius.s} ${borderRadius.s} 0 0`,
  background: highlight ? '#10b981' : '#cbd5f5',
}));

export const Footer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const OldPrice = styled.p({
  fontSize: '0.875rem',
  color: color.text.neutral.subtle,
  textDecoration: 'line-through',
});

export const NewPrice = styled.p({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: color.anthracite,
});

export const AlertCard = styled(motion.div)({
  position: 'absolute',
  bottom: '-1.5rem',
  left: '-1.5rem',
  background: '#ffffff',
  padding: '1rem',
  borderRadius: borderRadius.m,
  border: '1px solid #f1f5f9',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  zIndex: 20,
  maxWidth: '280px',
  '@media (min-width: 1024px)': {
    left: '-3rem',
  },
});

export const AlertIconWrapper = styled.div({
  width: '40px',
  height: '40px',
  borderRadius: borderRadius[50],
  background: '#ffedd5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const AlertTitle = styled.p({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: color.anthracite,
});

export const AlertText = styled.p({
  fontSize: '0.75rem',
  color: color.text.neutral.subtle,
});

