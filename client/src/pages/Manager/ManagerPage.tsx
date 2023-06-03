import React, {useEffect} from 'react';
import Title from "../../components/common-components/Title/Title";
import Menu from "../../components/Menu/Menu";
import Container from "../../components/common-components/Container/Container";
import {managerMenu} from "../../constant/menu/managerMenu";
import {useAppDispatch} from "../../hooks/redux";
import {getCategoryAll} from "../../store/reducers/category/categorySlice";
import {getUsersAll} from "../../store/reducers/users/usersSlice";
import {getDepartmentsAll} from "../../store/reducers/department/departmentSlice";
import {getProductsAll} from "../../store/reducers/products/productSlice";
import {getOrderAll} from "../../store/reducers/orders/orderSlice";
import {Link} from "react-router-dom";
import MenuItem from "../../components/MenuItem/MenuItem";

const ManagerPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersAll())
        dispatch(getCategoryAll())
        dispatch(getDepartmentsAll())
        dispatch(getProductsAll())
        dispatch(getOrderAll())
    }, [])

    return (
        <Container>
            <Title className={'text-center'}>Менеджер меню</Title>
            <Menu menuItem={managerMenu} />
            <Title className={'text-center my-[20px]'}>Отчеты</Title>
            <div className='m-auto flex items-center justify-center gap-x-[20px]'>
                <MenuItem name={'Отчет по пользователям'} path={'/reportByUser'}/>
                <MenuItem name={'Отчет по Категориям'} path={'/reportByCategory'} />
                <MenuItem name={'Популярные товары'} path={'/popularProduct'} />
            </div>
        </Container>
    );
};

export default ManagerPage;