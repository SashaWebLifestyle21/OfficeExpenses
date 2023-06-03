import React, {useEffect, useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import UpdateUserForm from "../../containers/UpdateUserForm/UpdateUserForm";
import Modal from "../../components/common-components/Modal/Modal";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {IUser} from "../../store/reducers/user/userSlice";
import UserItem from "../../components/common-components/userItem/UserItem";

const UpdateUser = () => {

    const dispatch = useAppDispatch()
    const { users } = useAppSelectors(state => state.usersReducer)

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [userForUpd, setUserForUpd] = useState<IUser | null>(null)



    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {users && users.map(user => {
                    return <UserItem user={user} className={'w-1/3'} setIsOpen={setIsOpen} setUserForUpd={setUserForUpd}/>
                })}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
                <UpdateUserForm user={userForUpd} />
            </Modal>
        </Container>
    );
};

export default UpdateUser;