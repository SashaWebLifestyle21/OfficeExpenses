import React, {useEffect, useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import Label from "../../components/common-components/Label/Label";
import Input from "../../components/common-components/Input/Input";
import FormImage from "../../components/common-components/FormImage/FormImage";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {getDepartmentsAll} from "../../store/reducers/department/departmentSlice";
import Select from "react-select/base";
import Button from "../../components/common-components/Button/Button";
import {createUser, getUsersAll} from "../../store/reducers/users/usersSlice";
import {toast} from "react-toastify";

const CreateUserForm = () => {

    const dispatch = useAppDispatch()
    const { departments } = useAppSelectors(state => state.departmentReducer)
    const { currentUser } = useAppSelectors(state => state.userReducer)

    const [image, setImage] = useState<any>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [phone, setPhone] = useState('')
    const [departmentId, setDepartmentId] = useState<number>(0)
    const [role, setRole] = useState('')

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setImage(fileList[0]);
    }

    const handleCreateUser = () => {
        const data = new FormData()
        data.append('email', email)
        data.append('password', password)
        data.append('firstName', firstName)
        data.append('patronymic', patronymic)
        data.append('lastName', lastName)
        data.append('phone', phone)
        data.append('image', image)
        data.append('role', currentUser?.role === 'ADMIN' ? role : 'USER')
        data.append('departmentId', departmentId.toString())
        dispatch(createUser(data))
        toast('Пользователь создан')
    }

    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <Title className={'text-center'}>Новый пользователь</Title>
            <form
                className={'flex items-center justify-center flex-col gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >

                <FormImage onChange={handleImage} labelText={'Прикрепить фото'}/>
                <div className={'object-cover max-w-[200px]'}>
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                        />
                    )}
                </div>
                <div className={'flex justify-center items-center flex-wrap gap-x-[10px] gap-y-[20px]'}>
                    <Input
                        type={'text'}
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        placeholder={'Email'}
                    />
                    <Input
                        type={'password'}
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                        placeholder={'Пароль'}
                    />
                    <Input
                        type={'text'}
                        value={firstName}
                        onChange={e => setFirstName(e.currentTarget.value)}
                        placeholder={'Имя'}
                    />
                    <Input
                        type={'text'}
                        value={patronymic}
                        onChange={e => setPatronymic(e.currentTarget.value)}
                        placeholder={'Отчество'}
                    />
                    <Input
                        type={'text'}
                        value={lastName}
                        onChange={e => setLastName(e.currentTarget.value)}
                        placeholder={'Фамилия'}
                    />
                    <Input
                        type={'text'}
                        value={phone}
                        onChange={e => setPhone(e.currentTarget.value)}
                        placeholder={'Телефон'}
                    />
                    <Label>
                        Отдел
                        <select
                            value={departmentId}
                            onChange={event => setDepartmentId(+event.currentTarget.value)}
                        >
                            {departments.map(department => {
                                return <option value={department.id}>{department.name}</option>
                            })}
                        </select>
                    </Label>
                    {currentUser?.role === 'ADMIN' && <Label>
                        Роль
                        <select
                            value={role}
                            onChange={event => setRole(event.currentTarget.value)}
                        >
                            <option value={'USER'}>USER</option>
                            <option value={'MANAGER'}>MANAGER</option>
                            <option value={'ADMIN'}>ADMIN</option>
                        </select>
                    </Label>}

                </div>
                <Button onClick={handleCreateUser}>Добавить</Button>
            </form>
        </div>
    );
};

export default CreateUserForm;