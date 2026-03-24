import React from 'react'
import { Toaster } from '@kinsta/stratus'

interface ErrorToasterProps{
    isOpen: boolean
    text: string,
    title: string,
    type: string
}

function CustomToaster({isOpen, text, title, type}: ErrorToasterProps) {
    return (
        <Toaster
            closeButtonAriaLabel='close'
            title={title}
            type={type}
            isOpen={isOpen}
            text={text}
        />
    )
}

export default CustomToaster