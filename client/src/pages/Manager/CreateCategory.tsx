import React from 'react';
import Button from "../../components/common-components/Button/Button";
import Container from "../../components/common-components/Container/Container";
import {useNavigate} from "react-router-dom";
import CreateCategoryForm from "../../containers/CreateCategoryForm/CreateCategoryForm";

const CreateCategory = () => {
    const navigate = useNavigate()
    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <CreateCategoryForm />
        </Container>
    );
};

export default CreateCategory;