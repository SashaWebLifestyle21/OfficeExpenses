import React from 'react';
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useAppSelectors} from "../../hooks/redux";
import OrderItem from "../../components/common-components/OrderItem/OrderItem";

const MyOrder = () => {
    const navigate = useNavigate()
    const { currentUser } = useAppSelectors(state => state.userReducer)
    const { orders } = useAppSelectors(state => state.orderReducer)

    return (
        <Container>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center flex-wrap gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {orders && currentUser && <>
                    {orders.map(order => {
                        if(order.userId === currentUser.id) {
                           return <OrderItem order={order} />
                        }
                    })}
                </> }
            </div>
        </Container>
    );
};

export default MyOrder;