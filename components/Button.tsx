import React from 'react';
import styled from '@emotion/styled';
import { Button as StratusButton } from '@kinsta/stratus';
 
type ButtonProps = React.ComponentProps<typeof StratusButton>;
 
const StyledButton = styled(StratusButton)`
  padding-inline: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
`;
 
export function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}
 
