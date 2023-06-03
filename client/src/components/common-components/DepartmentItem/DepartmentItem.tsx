import React, {Dispatch, SetStateAction} from 'react';
import Title from "../Title/Title";
import Text from "../Text/Text";
import {IDepartment} from "../../../store/reducers/department/departmentSlice";
import {IUser} from "../../../store/reducers/user/userSlice";

interface IDepartmentItem {
    department: IDepartment
    className?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    setDepartmentForUpd?: Dispatch<SetStateAction<IDepartment | null>>
}

const DepartmentItem = ({ department, className, setDepartmentForUpd, setIsOpen }: IDepartmentItem) => {
    const handleClickItem = () => {
        setIsOpen && setIsOpen(true)
        setDepartmentForUpd && setDepartmentForUpd(department)
    }
    return (
        <div
            className={`w-1/4 h-[150px] rounded-2xl border-2 bg-lightPrimary border-solid p-[5px] cursor-pointer 
         hover:bg-secondary overflow-hidden ${className ? className : ''}`}
            onClick={handleClickItem}
        >
            <Title className={'text-white overflow-hidden text-2xl'}>{department.name}</Title>
            <Text>Работает в отделе {department.countEmployee} человек</Text>
        </div>
    );
};

export default DepartmentItem;