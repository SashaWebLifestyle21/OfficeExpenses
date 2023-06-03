import React, {useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import CreateUserForm from "../../containers/CreateUserForm/CreateUserForm";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/common-components/Modal/Modal";

const CreateEmployee = () => {
    const navigate = useNavigate()
    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <CreateUserForm />
        </Container>
    );
};

export default CreateEmployee;