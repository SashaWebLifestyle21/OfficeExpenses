import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";

export interface IUser {
    id: number
    email: string
    password: string
    firstName: string
    patronymic: string
    lastName: string
    phone: string
    image: string
    role: string
    banned: boolean
    banReason: string
    departmentId: number
    createdAt: string
    department: {
        id: number
        name: string
        countEmployee: number
    }
}

interface IUserState {
    currentUser: IUser | null
    status: null | string
    isLoading: boolean
    token: null | string
}

const initialState: IUserState = {
    currentUser: null,
    status: null,
    isLoading: false,
    token: null
}

export interface IDataLogin {
    email: string
    password: string
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (registerData: FormData, thunkAPI) => {
    try {
        const { data } = await axios.post('auth/registration', registerData)
        if(data.token) {
            window.localStorage.setItem('token_user', data.token)
        }
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка')
    }
}
)

export const loginUser = createAsyncThunk(
    'user/registerUser',
    async (loginData: IDataLogin, thunkAPI) => {
        try {
            const { data } = await axios.post('auth/login', loginData)
            if(data.token) {
                window.localStorage.setItem('token_user', data.token)
            }
            return data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: {
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [loginUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled.type]: (state, action) => {
            console.log('LoginOK', action.payload)

            state.isLoading = false
            state.status = action.payload.message
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected.type]: (state, action) => {
            console.log('LoginERr', action.payload)
            state.status = action.payload
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state: IUserState) => Boolean(state.token)
export const { logout } = userSlice.actions
export default userSlice.reducer