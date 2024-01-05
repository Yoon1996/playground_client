import React from 'react'

interface ButtonProps {
    ment: string
    click: () => void
}

const ButtonComponent = ({ ment, click }: ButtonProps) => {
    return (
        <>
            <button
                className="bg-primary-a6 w-full h-8 rounded-md border-1 border-solid hover:bg-primary-dark"
                onClick={click}
            >
                {ment}
            </button>
        </>
    )
}

export default ButtonComponent
