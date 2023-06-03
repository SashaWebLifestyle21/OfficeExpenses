import React from 'react';
import Container from "../../components/common-components/Container/Container";
import Title from "../../components/common-components/Title/Title";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {checkIsAuth, logout} from "../../store/reducers/user/userSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const { currentUser, token } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('userToken')
        toast('Вы вышли из системы')
        navigate('/')
    }

    return (
        <header className='bg-primary py-[30px]'>
            <Container className={'flex items-center justify-between'}>
                {currentUser && <Title>{currentUser.firstName} {currentUser.lastName}</Title>}
                {token &&
                    <div>
                        <img
                            className={'w-[30px] h-[30px] cursor-pointer'}
                            src="../Images/exit.png"
                            alt="exit"
                            onClick={logoutHandler}
                        />
                    </div>}
            </Container>
        </header>
    );
};

export default Header;