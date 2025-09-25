import { createSlice, configureStore } from '@reduxjs/toolkit';
import dealsSlice from './dealsSlice';

const initialState = {
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state) {
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        registerSuccess(state) {
            state.isAuthenticated = false;
            state.error = null;
        },
        registerFailure(state, action) {
            state.isAuthenticated = false;
            state.error = action.payload;
        },
    },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure } = authSlice.actions;
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        deals: dealsSlice,
    },
});

console.log('authSlice.jsx loaded');