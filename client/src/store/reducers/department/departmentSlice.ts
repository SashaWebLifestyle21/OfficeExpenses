import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {userSlice} from "../user/userSlice";


export interface IDepartment {
    id: number
    name: string
    countEmployee: number
}

interface IDepartmentState {
    departments: IDepartment[]
    isLoading: boolean
    error: string
}

const initialState: IDepartmentState = {
    departments: [],
    isLoading: false,
    error: ''
}

export const getDepartmentsAll = createAsyncThunk(
    'department/getDepartmentsAll',
    async () => {
        try {
            const { data } = await axios.get('department')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const createDepartment = createAsyncThunk(
    'department/createDepartment',
    async (createDepartmentData: {name: string}, thunkAPI) => {
        try {
            const { data } = await axios.post('department', createDepartmentData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const updateDepartment = createAsyncThunk(
    'department/createDepartment',
    async (updateDepartmentData: {name: string, id: number}, thunkAPI) => {
        try {
            const { data } = await axios.put('department', updateDepartmentData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: {
        [getDepartmentsAll.pending.type]: (state) => {
            state.isLoading = true
        },
        [getDepartmentsAll.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.departments = action.payload
        },
        [getDepartmentsAll.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении отделов'
        },
        [createDepartment.pending.type]: (state) => {
            state.isLoading = true
        },
        [createDepartment.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.departments.push(action.payload)
        },
        [createDepartment.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении отделов'
        },
        [updateDepartment.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateDepartment.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.departments.findIndex(
                department => department.id === action.payload.id
            )
            state.departments[index] = action.payload
        },
        [updateDepartment.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при редактировании отделов'
        },
    }
})

export default departmentSlice.reducer