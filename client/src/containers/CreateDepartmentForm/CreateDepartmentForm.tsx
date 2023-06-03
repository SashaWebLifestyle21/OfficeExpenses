import React, {useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import Input from "../../components/common-components/Input/Input";
import {useAppDispatch} from "../../hooks/redux";
import {createDepartment} from "../../store/reducers/department/departmentSlice";
import Button from "../../components/common-components/Button/Button";
import {toast} from "react-toastify";

const CreateDepartmentForm = () => {
    const [name, setName] = useState('')
    const dispatch = useAppDispatch()

    const handleCreateDepartment = () => {
        dispatch(createDepartment({
            name
        }))
        toast('Создан новый отдел')
    }

    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <Title className={'text-center'}>Новый отдел</Title>
            <form
                className={'flex items-center justify-center flex-col gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >
                <Input
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder={'Название отдела'}
                />
                <Button onClick={handleCreateDepartment}>Добавить</Button>
            </form>
        </div>
    );
};

export default CreateDepartmentForm;