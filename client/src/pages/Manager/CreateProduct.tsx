import React from 'react';
import Button from "../../components/common-components/Button/Button";
import CreateCategoryForm from "../../containers/CreateCategoryForm/CreateCategoryForm";
import Container from "../../components/common-components/Container/Container";
import {useNavigate} from "react-router-dom";
import CreateProductForm from "../../containers/CreateProductForm/CreateProductForm";

const CreateProduct = () => {
    const navigate = useNavigate()

    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <CreateProductForm />
        </Container>    );
};

export default CreateProduct;