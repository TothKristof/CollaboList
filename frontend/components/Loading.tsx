import { motion } from "motion/react"
import { LoaderCircle } from "lucide-react"
import { borderRadius } from "@kinsta/stratus"
import styled from '@emotion/styled';

const LoadingWrapper = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    fontSize: '18px',
    background: props.theme.colors.background,
    color: props.theme.colors.text,
    borderRadius: borderRadius.xl,
    border: `solid 2px ${props.theme.colors.text}`,
    justifyContent: 'center',
    padding: '100px',
}));


function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 32, height: '100%' }}>
            <LoadingWrapper style={{
                background: 'white',
                borderRadius: borderRadius.xl,
                padding: '100px',
                display: 'flex',
                alignItems: 'center',

            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                    <LoaderCircle color="black" size={64} />
                </motion.div>
                <div style={{color: 'black'}}>Data is loading</div>
            </LoadingWrapper>
        </div>
    )
}

export default Loading