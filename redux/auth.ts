import { createSlice } from "@reduxjs/toolkit";
import { User } from "../@types/types";

export type Auth = {
    isLogin: boolean;
    isRegister: boolean;
    isLoginErr: string | null;
    isLogout: boolean;
    isLogoutErr: string | null;
    isRegisterErr: string | null;
    isAuth: boolean;
    isAuthErr: string | null;
    user: User;
    token: string;
};

const initialState: Auth = {
    isLogin: false,
    isLoginErr: null,
    isRegister: false,
    isRegisterErr: null,
    isLogout: false,
    isLogoutErr: null,
    isAuthErr: null,
    isAuth: false,
    token: "",
    user: {
        id: "",
        nickname: "",
        email: "",
        token: "",
        board: [
            {
                title: "",
                regDate: "",
                content: "",
                userId: "",
                _id: "",
                thumb: "",
                num: 0,
                count: 0,
                password: "",
            },
        ],
        review: [
            {
                _id: "",
                title: "",
                content: "",
                regDate: "",
                creator: "",
                userId: "",
                password: "",
                count: 0,
                selectedBook: {
                    title: "",
                    author: "",
                    image: "",
                    isbn: "",
                },
            },
        ],
    },
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest: (state, { payload }) => {
            state.isLogin = false;
            state.isLoginErr = null;
            state.token = "";
        },
        loginSuccess: (state, { payload }) => {
            state.isLogin = true;
            state.token = payload ? payload : "";
        },
        loginFailure: (state, { payload }) => {
            state.isLogin = false;
            state.isLoginErr = payload;
            state.token = "";
        },

        registerRequest: (state, { payload }) => {
            state.isRegister = false;
            state.isRegisterErr = null;
        },
        registerSuccess: (state) => {
            state.isRegister = true;
        },
        registerFailure: (state, { payload }) => {
            state.isRegister = false;
            state.isRegisterErr = payload;
        },

        logoutRequest: (state) => {
            state.isLogoutErr = null;
            state.isLogout = false;
        },
        logoutSuccess: (state) => {
            state.token = "";
            state.isLogin = false;
            state.isLogout = true;
        },
        logoutFailure: (state, { payload }) => {
            state.isLogoutErr = payload;
            state.isLogout = false;
        },

        authRequest: (state) => {
            state.isAuth = false;
        },
        authSuccess: (state, { payload }) => {
            state.isAuth = true;
            state.user = payload;
            state.isLogin = true;
        },
        authFailure: (state, { payload }) => {
            state.isAuth = false;
            state.isAuthErr = payload;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    authRequest,
    authSuccess,
    authFailure,
} = auth.actions;

export default auth.reducer;
