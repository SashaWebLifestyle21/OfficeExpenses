import React from 'react';
import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../containers/Header/Header";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer position='bottom-right'/>
        </>
    )
};

export default Layout;