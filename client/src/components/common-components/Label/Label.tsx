import React, {PropsWithChildren} from 'react';

interface ILabel extends PropsWithChildren{
    htmlFor?: string
    className?: string
}

const Label = ({ children, className, htmlFor }: ILabel) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`${className ? className : ''}`}
        >
            {children}
        </label>
    );
};

export default Label;