import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {IUser, userSlice} from "../user/userSlice";



interface IUsersState {
    users: IUser[]
    isLoading: boolean
    error: string
}

const initialState: IUsersState = {
    users: [],
    isLoading: false,
    error: ''
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (createUserData: FormData, thunkAPI) => {
        try {
            const { data } = await axios.post('users', createUserData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (updateUserData: FormData, thunkAPI) => {
        try {
            const { data } = await axios.put('users', updateUserData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const banUser = createAsyncThunk(
    'users/banUser',
    async (id: number, thunkAPI) => {
        try {
            const { data } = await axios.post('users/ban', {id})
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    }
)

export const getUsersAll = createAsyncThunk(
    'users/getUsersAll',
    async () => {
        try {
            const { data } = await axios.get('users')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsersAll.pending.type]: (state) => {
            state.isLoading = true
        },
        [getUsersAll.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.users = action.payload
        },
        [getUsersAll.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении пользователей'
        },
        [createUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [createUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.users.push(action.payload)
        },
        [createUser.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при получении пользователей'
        },
        [updateUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.users.findIndex(
                user => user.id === action.payload.id
            )
            state.users[index] = action.payload
        },
        [updateUser.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при обновлении пользователя'
        },
        [banUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [banUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            const index = state.users.findIndex(
                user => user.id === action.payload.id
            )
            state.users[index] = action.payload
        },
        [banUser.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Ошибка при блокировке пользователя'
        },
    }
})

export default usersSlice.reducer