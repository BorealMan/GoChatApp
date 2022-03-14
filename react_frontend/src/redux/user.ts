import { createSlice, configureStore } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name:'user',
    initialState: {
    loggedIn: false,
    token:null,
    user: null
}, reducers: {
    login: (state, action) => {
        state.loggedIn = true
        state.token = action.payload.token
        state.user = action.payload.user
    }, 
    logout: (state) => {
        state.loggedIn = false
        state.token = null
        state.user = null
    }
    }
})

export const {login, logout} = userSlice.actions

export const selectUser = (state:any) => state.user.user

export default userSlice.reducer