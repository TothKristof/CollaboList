import styled from "@emotion/styled";

export const PageWrapper = styled.div({
  display: "flex",
  flexDirection: 'column',
  width: "100%",
  maxWidth: "100%",
  backgroundColor: 'rgb(230, 209, 199)',
  gap: 24,
  overflow: 'hidden',
});

export const Sidebar = styled.div({
  width: 220,
  backgroundColor: "#ffffff",
  borderRadius: 16,
});

export const ContentWrapper = styled.div({
  flex: 1,
  minWidth: 0,
  display: "flex",
  gap: 24,
});

export const MainColumn = styled.div({
  flex: 3,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const RightColumn = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const CardRow = styled.div({
  display: "flex",
  gap: 24,
});
