import {
    createDepartment,
    departmentSlice,
    getDepartmentsAll,
    IDepartment,
    updateDepartment
} from "../department/departmentSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {IProduct} from "../products/productSlice";

export interface ICategory {
    id: number
    name: string
    limitSum: number
    products: IProduct[]
}

interface ICategoryState {
    categories: ICategory[]
    isLoading: boolean
    error: string
}

const initialState: ICategoryState = {
    categories: [],
    isLoading: false,
    error: ''
}

export const getCategoryAll = createAsyncThunk(
    'category/getCategoryAll',
    async () => {
        try {
            const { data } = await axios.get('category')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (createCategoryData: {name: string, limitSum: number}, thunkAPI) => {
        try {
            const { data } = await axios.post('category', createCategoryData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (updateCategoryData: {name: string, id: number, limitSum: number}, thunkAPI) => {
        try {
            const { data } = await axios.put('category', updateCategoryData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategoryAll.pending.type]: (state) => {
            state.isLoading = true
        },
        [getCategoryAll.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        },
        [getCategoryAll.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении категорий'
        },
        [createCategory.pending.type]: (state) => {
            state.isLoading = true
        },
        [createCategory.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.categories.push(action.payload)
        },
        [createCategory.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении отделов'
        },
        [updateCategory.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateCategory.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.categories.findIndex(
                category => category.id === action.payload.id
            )
            state.categories[index] = action.payload
        },
        [updateCategory.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при редактировании отделов'
        },
    }
})

export default categorySlice.reducer