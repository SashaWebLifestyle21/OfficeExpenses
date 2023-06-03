import React, {useEffect, useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import FormImage from "../../components/common-components/FormImage/FormImage";
import Input from "../../components/common-components/Input/Input";
import Label from "../../components/common-components/Label/Label";
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {IUser} from "../../store/reducers/user/userSlice";
import Image from "../../components/common-components/Image/Image";
import {banUser, updateUser} from "../../store/reducers/users/usersSlice";
import {toast} from "react-toastify";

interface IUpdateUserForm {
    user: IUser | null
}

const UpdateUserForm = ({ user }: IUpdateUserForm) => {

    console.log('updUser', user)

    const dispatch = useAppDispatch()
    const { departments } = useAppSelectors(state => state.departmentReducer)

    const [image, setImage] = useState<any>(null)
    const [oldImage, setOldImage] = useState<any>(null)
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
        setOldImage('')
    }

    const handleUpdate = () => {
        if(user) {
            const data = new FormData()
            data.append('id', user.id.toString())
            data.append('email', email)
            data.append('firstName', firstName)
            data.append('patronymic', patronymic)
            data.append('lastName', lastName)
            data.append('password', password)
            data.append('phone', phone)
            data.append('role', role)
            data.append('departmentId', departmentId.toString())
            if(!image) {
                data.append('image',oldImage)
            } else {
                data.append('image',image)
            }
            dispatch(updateUser(data))
            toast('Пользователь обновлен')
        }
    }

    const handleBanUser = () => {
        if(user) {
            dispatch(banUser(user.id))
            toast('Пользователь забанен')
        }
    }

    useEffect(() => {
        if(user) {
            setOldImage(user.image)
            setEmail(user.email)
            setFirstName(user.firstName)
            setPatronymic(user.patronymic)
            setLastName(user.lastName)
            setPhone(user.phone)
            setDepartmentId(user.department.id)
            setRole(user.role)
        }
    },[user])

    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <Title className={'text-center'}>Новый пользователь</Title>
            <form
                className={'flex items-center justify-center flex-col gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >

                <FormImage onChange={handleImage} labelText={'Прикрепить фото'}/>
                <div className={'object-cover max-w-[200px] flex'}>
                    {oldImage && (
                        <Image src={oldImage} alt={'user'} />
                    )}
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
                    {user?.role !== 'ADMIN' && <Label>
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
                <div className={'flex items-center justify-center gap-x-[10px]'}>
                <Button className={'hover:bg-red'}>Удалить</Button>
                <Button
                    disabled={user?.role === 'ADMIN'}
                    onClick={handleBanUser}
                >
                    {user?.banned ? 'Разбанить' : 'Забанить'}
                </Button>
                <Button
                    className={'hover:bg-secondary'}
                    onClick={handleUpdate}
                >
                    Обновить
                </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserForm;