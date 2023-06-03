import React, {useEffect, useMemo, useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import {useAppSelectors} from "../../hooks/redux";
import {IUser} from "../../store/reducers/user/userSlice";
import {ICategory} from "../../store/reducers/category/categorySlice";
import {IProduct} from "../../store/reducers/products/productSlice";
import Title from "../../components/common-components/Title/Title";
import Text from "../../components/common-components/Text/Text";

const PopularProducts = () => {
    const { orders } = useAppSelectors(state => state.orderReducer)
    const { products } = useAppSelectors(state => state.productReducer)

    const [listOrder, setListOrder] = useState<any>([])

    const sortedOrder = useMemo(() => {
        return [...listOrder].sort((a: {product: IProduct, count: number}, b: {product: IProduct, count: number}) => b.count - a.count)
    }, [listOrder])

    useEffect(() => {
        const result = products.map(product => {
            let count = 0
            orders.forEach(ord => {
                if(ord.productId === product.id) {
                    count += ord.sum / ord.product.price
                }
            })
            return {
                product,
                count: count
            }
        })
        setListOrder(result)
    })
    return (
        <Container>
            <Title>Товары которые заказывали наибольшее количество раз</Title>
            {sortedOrder && sortedOrder.map(order => {
                return <div className={'border-2 border-grey p-[15px]'}>
                    <Title>{order.product.name}</Title>
                    <Text>Количество: {order.count}</Text>
                </div>
            })}
        </Container>
    );
};

export default PopularProducts;