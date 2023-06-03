import React, {PropsWithChildren} from 'react';

interface IText extends PropsWithChildren{
    className?: string
}

const Text = ({ children, className }: IText) => {
    return (
        <p className={`text-[18px] text-darkPrimary font-semiBold ${className}`}>{children}</p>
    );
};

export default Text;