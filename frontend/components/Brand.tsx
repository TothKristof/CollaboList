import { borderRadius } from '@kinsta/stratus'
import styled from '@emotion/styled';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

const LogoDiv = styled.div((props) => ({
    padding: '10px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    fontSize: '18px',
    background: props.theme.colors.background,
    color: props.theme.colors.text,
    borderRadius: borderRadius.l,
    border: `solid 2px ${props.theme.colors.text}`,
    cursor: "pointer",
    textDecoration: 'none'
}));

export const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

function Brand() {
    const { isAuthenticated } = useAuth();

    return (
        <StyledLink href={isAuthenticated ? "/main" : "/"}>
            <LogoDiv>
                <NotebookText />
                <div>CollaboList</div>
            </LogoDiv>
        </StyledLink>
    )
}

export default Brand