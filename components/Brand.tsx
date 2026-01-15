import React from 'react'
import { Icon } from '@kinsta/stratus'
import styled from '@emotion/styled';

 const LogoDiv = styled.div`
  padding: 24px;
  display: flex;
  gap: 16px;
  font-family: var(--font-inter), sans-serif;
  align-items: center;
  font-size: 24px;
`;

function Logo() {
    return (
        <LogoDiv>
            <Icon type='List'></Icon>
            <div>CollaboList</div>
        </LogoDiv>
    )
}

export default Logo