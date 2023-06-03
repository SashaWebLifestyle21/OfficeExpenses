import React, {PropsWithChildren} from 'react';

interface ITitle extends PropsWithChildren{
    className?: string
}

const Title = ({ children, className }: ITitle) => {
    return (
        <h2 className={`text-[36px] text-darkPrimary font-bold ${className}`}>{children}</h2>
    );
};

export default Title;