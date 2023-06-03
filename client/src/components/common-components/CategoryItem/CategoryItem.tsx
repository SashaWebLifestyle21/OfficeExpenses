import React, {Dispatch, SetStateAction} from 'react';
import {IDepartment} from "../../../store/reducers/department/departmentSlice";
import {ICategory} from "../../../store/reducers/category/categorySlice";
import Title from "../Title/Title";
import Text from "../Text/Text";

interface ICategoryItem {
    category: ICategory
    className?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    setCategoryForUpd?: Dispatch<SetStateAction<ICategory | null>>
}

const CategoryItem = ({ category, setCategoryForUpd, setIsOpen, className }: ICategoryItem) => {
    const handleClickItem = () => {
        setIsOpen && setIsOpen(true)
        setCategoryForUpd && setCategoryForUpd(category)
    }
    return (
        <div
            className={`rounded-2xl border-2 bg-lightPrimary border-solid p-[5px] cursor-pointer 
         hover:bg-secondary overflow-hidden ${className ? className : ''}`}
            onClick={handleClickItem}
        >
            <Title className={'text-white overflow-hidden text-2xl'}>{category.name}</Title>
            <Text>Лимит по расходам {category.limitSum} рублей</Text>
        </div>
    );
};

export default CategoryItem;