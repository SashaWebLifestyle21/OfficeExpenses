import React from 'react';

interface IButton {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ children, className, onClick, disabled }: IButton) => {
    return (
        <button
            className={`rounded-[5px] cursor-pointer transition duration-300 ease-linear px-[60px] py-[17px] 
            border-primary border-2 border-solid bg-primary text-white hover:bg-white hover:text-primary disabled:bg-grey disabled:text-darkPrimary ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;