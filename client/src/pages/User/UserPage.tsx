import React, {FC, useEffect} from 'react';
import Title from "../../components/common-components/Title/Title";
import Menu from "../../components/Menu/Menu";
import Container from "../../components/common-components/Container/Container";
import {userMenu} from "../../constant/menu/userMenu";
import {useAppDispatch} from "../../hooks/redux";
import {getCategoryAll} from "../../store/reducers/category/categorySlice";
import {getDepartmentsAll} from "../../store/reducers/department/departmentSlice";
import {getProductsAll} from "../../store/reducers/products/productSlice";
import {getOrderAll} from "../../store/reducers/orders/orderSlice";

const UserPage: FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoryAll())
        dispatch(getDepartmentsAll())
        dispatch(getProductsAll())
        dispatch(getOrderAll())
    },[])
    return (
        <Container>
            <Title className={'text-center'}>Пользовательское меню</Title>
            <Menu menuItem={userMenu} />
        </Container>
    );
};

export default UserPage;