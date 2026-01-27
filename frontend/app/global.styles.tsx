import styled from "@emotion/styled";
import { space } from "@kinsta/stratus";

export const RowWithSpaceBetween = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CustomCard = styled.div({
  flex: 1,
  backgroundColor: "#ffffff",
  borderRadius: space[200],
});


export const CenterContentDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  padding: 0,
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
});