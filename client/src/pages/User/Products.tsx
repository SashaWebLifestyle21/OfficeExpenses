import React, {useState} from 'react';
import {IProduct} from "../../store/reducers/products/productSlice";
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import Title from "../../components/common-components/Title/Title";
import ProductItem from "../../components/common-components/ProductItem/ProductItem";
import Input from "../../components/common-components/Input/Input";
import Modal from "../../components/common-components/Modal/Modal";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {createOrder} from "../../store/reducers/orders/orderSlice";
import {toast} from "react-toastify";

interface IProducts {
    products: IProduct[]
}

const Products = ({ products }: IProducts) => {
    const navigate = useNavigate()

    const { currentUser } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [productForOrder, setProductForOrder] = useState<IProduct | null>(null)

    const handleCreateOrder = () => {
        if(productForOrder && currentUser) {
            dispatch(createOrder({
                sum: count * productForOrder.price,
                productId: productForOrder.id,
                categoryId: productForOrder.categoryId,
                userId: currentUser?.id
            }))
            setIsOpen(false)
            toast('Заявка создана')
        }
    }

    return (
        <Container>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {products.length === 0
                ? <Title>Нет товаров в данной катеогории</Title>
                : <>
                        {products.map(product => <ProductItem
                            product={product}
                            setProductForUpd={setProductForOrder}
                            setIsOpen={setIsOpen}
                        />)}
                    </>
                }
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                {productForOrder &&
                    <>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className={'flex flex-col items-center justify-between w-[70vw]'}
                        >
                            <Input
                                type={'number'}
                                value={count}
                                onChange={e => setCount(+e.currentTarget.value)}
                                placeholder={'Количество'}
                                className={'mt-[30px]'}
                            />
                            <Button
                                className={'mt-[15px]'}
                                onClick={handleCreateOrder}
                            >
                                Оформить заявку
                            </Button>
                        </form>
                    </>}
            </Modal>
        </Container>
    );
};

export default Products;