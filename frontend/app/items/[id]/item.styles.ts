import styled from "@emotion/styled";
import { space } from "@kinsta/stratus";

export const PageWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 24,
    height: '90vh',
    boxSizing: 'border-box',
});

export const TopRow = styled.div({
    display: 'grid',
    gridTemplateColumns: '2fr 4fr',
    gap: 16,
    flex: 1,
});

export const Panel = styled.div({
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    padding: 24,
    background: '#fff',
    maxHeight: '400px'
});


export const ItemNameHeader = styled.h1((props) => ({
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    color: props.theme.colors.text
}));

export const ItemNumber = styled.p((props) => ({
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    opacity: 1,
    color: 'grey'
}));