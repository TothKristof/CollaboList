import styled from "@emotion/styled";
import { borderRadius, breakpoints, space } from "@kinsta/stratus";

export const PageWrapper = styled.div({
  display: "flex",
  flexDirection: 'column',
  width: "100%",
  maxWidth: "100%",
  backgroundColor: 'rgb(230, 209, 199)',
  gap: space[100],
  overflow: 'hidden',
});

export const Sidebar = styled.div({
  width: 220,
  backgroundColor: "#ffffff",
  borderRadius: 16,
});

export const ContentWrapper = styled.div({
  display: 'grid',
  minWidth: 0,
  gap: space[300],
  [breakpoints.l.up]: {
    display: "flex",
    flex: 1,
  }

});

export const MainColumn = styled.div({
  flex: 3,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: space[300],
});

export const RightColumn = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: space[300],
});

export const CardRow = styled.div({
  display: "flex",
  gap: space[300],
});

export const AvatarSegment = styled.div({
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: borderRadius.l,
  gap: space[150],
  padding: space[100],
  paddingInline: space[400],
  cursor: 'pointer'
});
