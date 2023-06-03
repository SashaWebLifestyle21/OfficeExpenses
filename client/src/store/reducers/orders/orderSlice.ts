import {createCategory, getCategoryAll, ICategory, updateCategory} from "../category/categorySlice";
import {IUser} from "../user/userSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {IProduct} from "../products/productSlice";


export interface IOrder {
    id: number
    sum: number
    isApproved: boolean
    categoryId: number
    productId: number
    userId: number
    managerId: number | null
    category: ICategory
    product: IProduct
    user: IUser
}

export interface IOrderState {
    orders: IOrder[]
    isLoading: boolean
    error: string
}

const initialState: IOrderState = {
    orders: [],
    isLoading: false,
    error: ''
}

export const getOrderAll = createAsyncThunk(
    'order/getOrderAll',
    async () => {
        try {
            const { data } = await axios.get('order')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (createOrderData: {sum: number, categoryId: number, productId: number, userId: number}, thunkAPI) => {
        try {
            const { data } = await axios.post('order', createOrderData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const approveOrder = createAsyncThunk(
    'order/approveOrder',
    async (approveOrderData: {managerId: number, id: number, isApproved: boolean}, thunkAPI) => {
        try {
            const { data } = await axios.post('order/approve', approveOrderData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [getOrderAll.pending.type]: (state) => {
            state.isLoading = true
        },
        [getOrderAll.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.orders = action.payload
        },
        [getOrderAll.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении заказов'
        },
        [createOrder.pending.type]: (state) => {
            state.isLoading = true
        },
        [createOrder.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.orders.push(action.payload)
        },
        [createOrder.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при создании заказа'
        },
        [approveOrder.pending.type]: (state) => {
            state.isLoading = true
        },
        [approveOrder.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.orders.findIndex(
                order => order.id === action.payload.id
            )
            state.orders[index] = action.payload
        },
        [approveOrder.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при поддтверждении заявки'
        },
    }
})
export default orderSlice.reducer
