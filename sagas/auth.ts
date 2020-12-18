import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    authRequest,
    authSuccess,
    authFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
} from "../redux/auth";
import { loadFailure, loadSuccess } from "../redux/loading";
import { SignWriteText, User } from "../@types/types";

// ajax

function login(form: SignWriteText) {
    return Axios.post("/login", form).then((res) => res.data);
}

function logout() {
    return Axios.get("/logout");
}

function register(form: SignWriteText) {
    return Axios.post("/register", form).then((res) => res.data);
}

function getUserData() {
    return Axios.get("/auth").then((res) => res.data);
}

// call & put

function* postLogin({ payload }: PayloadAction<SignWriteText>) {
    try {
        const token = yield call(login, payload);
        document.cookie = `x_auth=${token}`;
        yield put(loginSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loginFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

function* postLogout() {
    try {
        yield call(logout);
        document.cookie = "x_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        yield put(logoutSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(logoutFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

function* postRegister({ payload }: PayloadAction<SignWriteText>) {
    try {
        const token = yield call(register, payload);
        document.cookie = `x_auth=${token}`;
        yield put(registerSuccess());
        yield put(loginSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(registerFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

function* getAuth() {
    try {
        const userData: User = yield call(getUserData);
        yield put(authSuccess(userData));
        yield put(loginSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(authFailure(err.message));
        yield put(loadSuccess());
    }
}

// watch

function* watchLoginRequest() {
    yield takeLatest(loginRequest, postLogin);
}

function* watchLogoutRequest() {
    yield takeLatest(logoutRequest, postLogout);
}

function* watchRegisterRequest() {
    yield takeLatest(registerRequest, postRegister);
}

function* watchAuthRequest() {
    yield takeLatest(authRequest, getAuth);
}

export default function* auth(): Generator {
    yield all([
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
        fork(watchRegisterRequest),
        fork(watchAuthRequest),
    ]);
}
