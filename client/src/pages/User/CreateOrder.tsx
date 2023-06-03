import React, {useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import ProductItem from "../../components/common-components/ProductItem/ProductItem";
import {useAppSelectors} from "../../hooks/redux";
import Modal from "../../components/common-components/Modal/Modal";
import {IProduct} from "../../store/reducers/products/productSlice";
import Input from "../../components/common-components/Input/Input";
import axios from "../../api/axios/axios";
import CategoryItem from "../../components/common-components/CategoryItem/CategoryItem";

const CreateOrder = () => {
    const navigate = useNavigate()

    const { products } = useAppSelectors(state => state.productReducer)
    const { categories } = useAppSelectors(state => state.categoryReducer)





    return (
        <Container>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {/*{products && products.map(product => {*/}
                {/*    return <ProductItem product={product} setProductForUpd={setProductForOrder} setIsOpen={setIsOpen} />*/}
                {/*})}*/}
                {categories && categories.map(category => {
                    return <Link key={category.name} className={'block'} to={`/category/${category.id}`}>
                        <CategoryItem category={category}  />
                    </Link>
                })}
            </div>
        </Container>
    );
};

export default CreateOrder;