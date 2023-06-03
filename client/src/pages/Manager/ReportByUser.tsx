import React, {useEffect, useMemo, useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import {useAppSelectors} from "../../hooks/redux";
import Title from "../../components/common-components/Title/Title";
import UserItem from "../../components/common-components/userItem/UserItem";
import Text from "../../components/common-components/Text/Text";
import {userMenu} from "../../constant/menu/userMenu";
import {IOrder} from "../../store/reducers/orders/orderSlice";
import {IUser} from "../../store/reducers/user/userSlice";

const ReportByUser = () => {
    const { orders } = useAppSelectors(state => state.orderReducer)
    const { users } = useAppSelectors(state => state.usersReducer)

    const [listOrder, setListOrder] = useState<any>([])

    const sortedOrder = useMemo(() => {
        return [...listOrder].sort((a: {user: IUser, sum: number}, b: { user: IUser, sum: number }) => b.sum - a.sum)
    }, [listOrder])

    useEffect(() => {
        const result = users.map(user => {
            let sumUser = 0
            orders.forEach(ord => {
                if(ord.userId === user.id) {
                    sumUser += ord.sum
                }
            })
            return {
                user,
                sum: sumUser
            }
        })
        setListOrder(result)
    })

    return (
        <Container>
            <Title>Сотрудники потратившие наибольшее количество средств</Title>
            {sortedOrder && sortedOrder.map(order => {
                return <div className={'border-2 border-grey p-[15px]'}>
                    <Title>{order.user.lastName} {order.user.firstName} {order.user.patronymic}</Title>
                    <Text>Email: {order.user.email}</Text>
                    <Text>Сумма: {order.sum}</Text>
                </div>
            })}
        </Container>
    );
};

export default ReportByUser;