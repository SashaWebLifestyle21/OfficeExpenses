import React from 'react';
import {approveOrder, IOrder} from "../../../store/reducers/orders/orderSlice";
import ProductItem from "../ProductItem/ProductItem";
import CategoryItem from "../CategoryItem/CategoryItem";
import UserItem from "../userItem/UserItem";
import Text from "../Text/Text";
import Button from "../Button/Button";
import {useAppDispatch, useAppSelectors} from "../../../hooks/redux";
import {toast} from "react-toastify";

interface IOrderItem {
    order: IOrder
}

const OrderItem = ({ order }: IOrderItem) => {
    const { currentUser } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()
    const handleApprove = () => {
        if(currentUser) {
            dispatch(approveOrder({
                isApproved: true,
                id: order.id,
                managerId: currentUser.id
            }))
            toast('Заявка одобрена')
        }
    }
    return (
        <div className={`w-1/4 border-2 border-grey rounded-2xl bg-lightGrey p-[15px] ${order.isApproved ? 'bg-secondary' : 'bg-red'}`}>
            <Text>{order.isApproved ? 'Одобренно' : 'Не одобренно'}</Text>
            <ProductItem product={order.product} />
            <CategoryItem category={order.category} />
            <Text>От {order.user.lastName} {order.user.firstName} {order.user.patronymic}</Text>
            <Text>Сумма: {order.sum}</Text>
            {currentUser && currentUser.role !== 'USER' && <Button
                onClick={handleApprove}
                disabled={order.isApproved}
            >
                Одобрить
            </Button>}

        </div>
    );
};

export default OrderItem;