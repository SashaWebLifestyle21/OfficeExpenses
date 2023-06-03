import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice";
import usersReducer from "./reducers/users/usersSlice";
import departmentReducer from "./reducers/department/departmentSlice";
import categoryReducer from "./reducers/category/categorySlice";
import productReducer from "./reducers/products/productSlice";
import orderReducer from "./reducers/orders/orderSlice";

const rootReducer = combineReducers({
    userReducer,
    departmentReducer,
    usersReducer,
    categoryReducer,
    productReducer,
    orderReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']