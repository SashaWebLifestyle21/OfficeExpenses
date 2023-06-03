import React, {useEffect} from 'react';
import Container from "../../components/common-components/Container/Container";
import Menu from "../../components/Menu/Menu";
import {adminMenu} from "../../constant/menu/adminMenu";
import Title from "../../components/common-components/Title/Title";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {getDepartmentsAll} from "../../store/reducers/department/departmentSlice";
import {getUsersAll} from "../../store/reducers/users/usersSlice";

const AdminPage = () => {
    const dispatch = useAppDispatch()

    const { currentUser } = useAppSelectors(state => state.userReducer)

    useEffect(() => {
        dispatch(getDepartmentsAll())
        dispatch(getUsersAll())
    }, [])
    return (
        <Container>
            <Title className={'text-center'}>Админ меню</Title>
            <Menu menuItem={adminMenu} />
        </Container>
    );
};

export default AdminPage;