import React from 'react';
import {useNavigate} from "react-router-dom";
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import CreateUserForm from "../../containers/CreateUserForm/CreateUserForm";
import CreateDepartmentForm from "../../containers/CreateDepartmentForm/CreateDepartmentForm";
import {useAppSelectors} from "../../hooks/redux";
import DepartmentItem from "../../components/common-components/DepartmentItem/DepartmentItem";

const CreateDepartment = () => {
    const navigate = useNavigate()
    const { departments } = useAppSelectors(state => state.departmentReducer)
    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <CreateDepartmentForm />
            <div className={'mt-[20px] flex items-center justify-center gap-x-[15px] gap-y-[20px]'}>
                {departments.map(item => {
                    return <DepartmentItem department={item} />
                })}
            </div>
        </Container>
    );
};

export default CreateDepartment;