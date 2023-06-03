import AdminPage from "./pages/Admin/AdminPage";
import ManagerPage from "./pages/Manager/ManagerPage";
import UserPage from "./pages/User/UserPage";
import React from "react";

export const adminRoutes = [
    {
        path: '/admin',
        Component: AdminPage
    }
]

export const managerPage = [
    {
        path: '/manager',
        Component: ManagerPage
    }
]

export const userPage = [
    {
        path: '/user',
        Component: UserPage
    }
]