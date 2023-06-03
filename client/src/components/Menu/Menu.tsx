import React from 'react';
import {IMenuItem} from "../../constant/menu/model/menuType";
import MenuItem from "../MenuItem/MenuItem";

interface IMenu {
    menuItem: IMenuItem[]
}

const Menu = ({ menuItem }: IMenu) => {
    return (
        <div className='flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap mt-[20px]'>
            {menuItem.map(item => {
                return <MenuItem name={item.name} path={item.path} />
            })}
        </div>
    );
};

export default Menu;