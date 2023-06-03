import React, {Dispatch, SetStateAction} from 'react';
import {IUser} from "../../../store/reducers/user/userSlice";
import Image from "../Image/Image";
import Title from "../Title/Title";
import Text from "../Text/Text";

interface IUserItem {
    user: IUser
    className?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    setUserForUpd?: Dispatch<SetStateAction<IUser | null>>
}

const UserItem = ({ user, className, setUserForUpd, setIsOpen }: IUserItem) => {

    const handleClickItem = () => {
        setIsOpen && setIsOpen(true)
        setUserForUpd && setUserForUpd(user)
    }


    return (
        <div className={`rounded-2xl border-2 bg-white border-solid border-[#E7E7E7] flex flex-col items-center justify-center gap-y-[15px] p-[22px] cursor-pointer
         hover:bg-secondary overflow-hidden ${className ? className : ''}`}
             onClick={handleClickItem}
        >
            <div className={'flex items-center justify-items-start gap-x-[15px]'}>
                <div className={'w-[50px] h-[50px]'}>
                    <Image src={user.image} alt={user.email} />
                </div>
                <div>
                    <Title className={'text-[16px] font-[500]'}>{user.firstName} {user.patronymic} {user.lastName}</Title>
                    <Text className={'text-[14px] text-grey'}>Отдел: {user.department.name}</Text>
                </div>
            </div>
            <div>
                <Text>Роль: {user.role}</Text>
            </div>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center justify-center gap-x-[8px]'}>
                    <img
                        src={'../Icons/phone-call.svg'}
                        alt={'phone'}
                    />
                    <Text className={'text-[14px] text-grey'}>{user.phone}</Text>
                </div>
                <div className={'flex items-center justify-center gap-x-[8px]'}>
                    <img
                        src={'../Icons/mail.svg'}
                        alt={'email'}
                    />
                    <Text className={'text-[14px] text-grey'}>{user.email}</Text>
                </div>
            </div>
        </div>
    );
};

export default UserItem;