import styled from '@emotion/styled'
import { borderRadius, breakpoints, space } from '@kinsta/stratus'

export const HorizontalAlignment = styled.div({
    height: '70vh',
    margin: 'auto',
    width: '90%',
    display: 'flex',
    borderRadius: borderRadius.xl,
    color: 'black',
    backgroundImage: `
    linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),
    url('/loginpic.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [breakpoints.m.up]: {
        height: '750px',
        width: '1000px',
        margin: 'auto',
        overflow: 'hidden',
        backgroundImage: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
})

export const ImageWrapper = styled.div({
    display: 'none',
    [breakpoints.m.up]: {
        display: 'block',
        position: 'relative',
        width: '50%',
        height: '100%',
    },
})

export const FormWrapper = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: space[300],
    textAlign: 'center',
    gap: space[500],

    [breakpoints.m.up]: {
        width: '50%',
    },
})

