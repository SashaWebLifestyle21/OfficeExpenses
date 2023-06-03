import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";


export interface IProduct {
    id: number
    name: string
    price: number
    image: string
    categoryId: number
}

interface IProductState {
    products: IProduct[]
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
    products: [],
    isLoading: false,
    error: ''
}

export const getProductsAll = createAsyncThunk(
    'product/getProductsAll',
    async () => {
        try {
            const { data } = await axios.get('product')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const createProduct = createAsyncThunk(
    'department/createDepartment',
    async (createProductData: FormData, thunkAPI) => {
        try {
            const { data } = await axios.post('product', createProductData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (updateProductData: FormData, thunkAPI) => {
        try {
            const { data } = await axios.put('product', updateProductData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        [getProductsAll.pending.type]: (state) => {
            state.isLoading = true
        },
        [getProductsAll.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.products = action.payload
        },
        [getProductsAll.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении продуктов'
        },
        [createProduct.pending.type]: (state) => {
            state.isLoading = true
        },
        [createProduct.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.products.push(action.payload)
        },
        [createProduct.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при создании товара'
        },
        [updateProduct.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateProduct.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.products.findIndex(
                product => product.id === action.payload.id
            )
            state.products[index] = action.payload
        },
        [updateProduct.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при обновлении товара'
        },
    }
})

export default productSlice.reducer