import React, {useState} from 'react';
import Input from "../../components/common-components/Input/Input";
import Title from "../../components/common-components/Title/Title";
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {loginUser} from "../../store/reducers/user/userSlice";

const AuthForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const handleAuth = () => {
        dispatch(loginUser({
            email,
            password
        }))
    }

    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <form
                className={'flex items-center flex-col justify-center gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >
                <Title>Авторизуйтесь</Title>
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
                <Button onClick={handleAuth}>Войти</Button>
            </form>
        </div>
    );
};

export default AuthForm;