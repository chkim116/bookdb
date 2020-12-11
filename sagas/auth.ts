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
    return Axios.post("/login", form);
}

function logout() {
    return Axios.get("/logout");
}

function register(form: SignWriteText) {
    return Axios.post("/register", form);
}

function getUserData() {
    return Axios.get("/auth").then((res) => res.data);
}

// call & put

function* postLogin({ payload }: PayloadAction<SignWriteText>) {
    try {
        yield call(login, payload);
        yield put(loginSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loginFailure(err.message));
        yield put(loadFailure());
    }
}

function* postLogout() {
    try {
        yield call(logout);
        yield put(logoutSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(logoutFailure(err.message));
        yield put(loadFailure());
    }
}

function* postRegister({ payload }: PayloadAction<SignWriteText>) {
    try {
        yield call(register, payload);
        yield put(registerSuccess());
        yield put(loginSuccess());
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(registerFailure(err.message));
        yield put(loadFailure());
    }
}

function* getAuth() {
    try {
        const userData: User = yield call(getUserData);
        yield put(authSuccess(userData));
        yield put(loginSuccess());
    } catch (err) {
        console.log(err);
        yield put(authFailure(err.message));
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
