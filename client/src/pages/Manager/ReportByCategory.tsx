import React, {useEffect, useMemo, useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import {useAppSelectors} from "../../hooks/redux";
import {IOrder} from "../../store/reducers/orders/orderSlice";
import {IUser} from "../../store/reducers/user/userSlice";
import {ICategory} from "../../store/reducers/category/categorySlice";
import Title from "../../components/common-components/Title/Title";
import Text from "../../components/common-components/Text/Text";

const ReportByCategory = () => {
    const { orders } = useAppSelectors(state => state.orderReducer)
    const { categories } = useAppSelectors(state => state.categoryReducer)
    const [listOrder, setListOrder] = useState<any>([])

    const sortedOrder = useMemo(() => {
        return [...listOrder].sort((a: {category: ICategory, sum: number}, b: {category: ICategory, sum: number}) => b.sum - a.sum)
    }, [listOrder])

    useEffect(() => {
        const result = categories.map(category => {
            let sumCategory = 0
            orders.forEach(ord => {
                if(ord.categoryId === category.id) {
                    sumCategory += ord.sum
                }
            })
            return {
                category,
                sum: sumCategory
            }
        })
        setListOrder(result)
    })

    return (
        <Container>
            <Title>Категории с наибольшим расходом средств</Title>
            {sortedOrder && sortedOrder.map(order => {
                return <div className={'border-2 border-grey p-[15px]'}>
                    <Title>{order.category.name}</Title>
                    <Text>Сумма: {order.sum}</Text>
                </div>
            })}
        </Container>
    );
};

export default ReportByCategory;