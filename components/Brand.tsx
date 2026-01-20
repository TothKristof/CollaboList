import React from 'react'
import { Icon, borderRadius } from '@kinsta/stratus'
import styled from '@emotion/styled';

const LogoDiv = styled.div({
    padding: '10px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    fontSize: '18px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: borderRadius.l
});

function Brand() {
    return (
        <LogoDiv>
            <Icon type='List'></Icon>
            <div>CollaboList</div>
        </LogoDiv>
    )
}

export default Brand