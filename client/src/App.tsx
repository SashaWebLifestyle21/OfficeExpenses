import React, {useEffect} from 'react';
import {Route, Routes, redirect} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./pages/User/Auth";
import {useAppDispatch, useAppSelectors} from "./hooks/redux";
import {adminRoutes} from "./routes";
import AdminPage from "./pages/Admin/AdminPage";
import ManagerPage from "./pages/Manager/ManagerPage";
import UserPage from "./pages/User/UserPage";
import CreateEmployee from "./pages/Admin/CreateEmployee";
import CreateDepartment from "./pages/Admin/CreateDepartment";
import UpdateUser from "./pages/Admin/UpdateUser";
import UpdateDepartment from "./pages/Admin/UpdateDepartment";
import CreateCategory from "./pages/Manager/CreateCategory";
import CreateProduct from "./pages/Manager/CreateProduct";
import UpdateCategory from "./pages/Manager/UpdateCategory";
import UpdateProduct from "./pages/Manager/UpdateProduct";
import Profile from "./pages/User/Profile";
import CreateOrder from "./pages/User/CreateOrder";
import {getCategoryAll} from "./store/reducers/category/categorySlice";
import Products from "./pages/User/Products";
import Orders from "./pages/Manager/Orders";
import MyOrder from "./pages/User/MyOrder";
import ReportByUser from "./pages/Manager/ReportByUser";
import ReportByCategory from "./pages/Manager/ReportByCategory";
import PopularProducts from "./pages/Manager/PopularProducts";

function App() {

    const { currentUser } = useAppSelectors(state => state.userReducer)
    const { categories } = useAppSelectors(state => state.categoryReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoryAll())
    }, [])
  return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Auth />} />
                {currentUser?.role === 'ADMIN' && (
                    <>
                        <Route path={'/admin'} element={<AdminPage />}/>
                        <Route path={'/createUser'} element={<CreateEmployee />}/>
                        <Route path={'/updateUser'} element={<UpdateUser />}/>
                        <Route path={'/createDepartment'} element={<CreateDepartment />}/>
                        <Route path={'/updateDepartment'} element={<UpdateDepartment />}/>
                    </>

                )}
                {currentUser?.role === 'MANAGER' && (
                    <>
                        <Route path={'/manager'} element={<ManagerPage />}/>
                        <Route path={'/createCategory'} element={<CreateCategory />}/>
                        <Route path={'/updateCategory'} element={<UpdateCategory />}/>
                        <Route path={'/createUser'} element={<CreateEmployee />}/>
                        <Route path={'/updateUser'} element={<UpdateUser />}/>
                        <Route path={'/createProduct'} element={<CreateProduct />}/>
                        <Route path={'/updateProduct'} element={<UpdateProduct />}/>
                        <Route path={'/orders'} element={<Orders />}/>
                    </>
                )}
                {currentUser?.role === 'USER' && (
                    <>
                        <Route path={'/user'} element={<UserPage />}/>
                        <Route path={'/profileUser'} element={<Profile />}/>
                        <Route path={'/createOrder'} element={<CreateOrder />}/>
                        <Route path={'/myOrder'} element={<MyOrder />}/>
                        <Route path={'category/*'}>
                            {categories && categories.map(category =>
                                <Route
                                    key={category.id}
                                    path={category.id.toString()}
                                    element={<Products products={category.products} />}
                                />)}
                        </Route>
                    </>
                )}
            </Route>
            {currentUser?.role === 'MANAGER' && (
                <>
                    <Route path={'/reportByUser'} element={<ReportByUser />}/>
                    <Route path={'/reportByCategory'} element={<ReportByCategory />}/>
                    <Route path={'/popularProduct'} element={<PopularProducts />}/>
                </>)}
        </Routes>
  );
}

export default App;
