import React from 'react';
import {Link} from "react-router-dom";
import Text from "../common-components/Text/Text";

interface IMenuItemProps {
    name: string
    path: string
    isTarget?: boolean
}

const MenuItem = ({ name, path, isTarget }: IMenuItemProps) => {
    return (
        <div className='p-[10px] rounded-[5px] bg-lightPrimary w-1/4 hover:bg-secondary'>
            <Link to={path} target={`${isTarget ? '_blank' : '_self'}`} >
                <Text className={'text-white text-center'}>{name}</Text>
            </Link>
        </div>
    );
};

export default MenuItem;