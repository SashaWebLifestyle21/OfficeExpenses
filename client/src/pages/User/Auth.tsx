import React, {useEffect} from 'react';
import AuthForm from "../../containers/AuthForm/AuthForm";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {logout} from "../../store/reducers/user/userSlice";

const Auth = () => {
    const { currentUser, token, status } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {


        if(currentUser?.banned) {
            console.log('curUser', currentUser)
            toast.error('Пользователь забанен')
            dispatch(logout())
        } else {
            if(status) toast(status)
            if(token && currentUser?.role === 'ADMIN') navigate('/admin')
            if(token && currentUser?.role === 'MANAGER') navigate('/manager')
            if(token && currentUser?.role === 'USER') navigate('/user')
        }

    }, [token, currentUser, status])

    return (
        <div className={'bg-lightGrey h-[80vh] flex items-center justify-center'}>
            <AuthForm />
        </div>
    );
};

export default Auth;