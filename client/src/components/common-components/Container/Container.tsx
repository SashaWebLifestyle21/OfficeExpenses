import React, {PropsWithChildren} from 'react';

interface IContainer extends PropsWithChildren{
    className?: string
}

const Container = ({ className, children }: IContainer) => {
    return (
        <div className={`container m-auto ${className ? className : ''}`}>
            {children}
        </div>
    );
};

export default Container;