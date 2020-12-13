import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import {
    delFreeBoardFailure,
    delFreeBoardRequest,
    delFreeBoardSuccess,
    getFreeBoardByIdFailure,
    getFreeBoardByIdRequest,
    getFreeBoardByIdSuccess,
    freeBoardWriteSubmit,
    freeBoardWriteUpdate,
    getFreeBoardRequest,
    getFreeBoardSuccess,
    getFreeBoardFailure,
    freeBoardRouter,
} from "../redux/freeBoard";
import { WriteText } from "../@types/types";
import { loadFailure, loadSuccess } from "../redux/loading";

// ajax

function postSubmit(text: WriteText) {
    return Axios.post("/board/post", text).then((res) => res.data);
}

function postUpdate(text: WriteText) {
    return Axios.put("/board/edit", text);
}

function getFreeBoardId(id: string | string[]) {
    return Axios.get(`/board/${id}`).then((res) => res.data);
}

function getFreeBoard() {
    return Axios.get("/board").then((res) => res.data);
}

function deleteFreeBoardPost(id: string) {
    return Axios.delete(`/board/del/${id}`);
}

// call & put

function* freeBoardSubmit({ payload }: PayloadAction<WriteText>) {
    try {
        const post = yield call(postSubmit, payload);
        yield put(freeBoardRouter(post._id));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loadFailure(err.message));
    }
}

function* freeBoardUpdate({ payload }: PayloadAction<WriteText>) {
    try {
        yield call(postUpdate, payload);
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loadFailure(err.message));
    }
}

function* getFreeBoardById({ payload }: PayloadAction<string | string[]>) {
    try {
        const FreeBoard = yield call(getFreeBoardId, payload);
        yield put(getFreeBoardByIdSuccess(FreeBoard));
    } catch (err) {
        console.log(err);
        yield put(getFreeBoardByIdFailure(err.message));
    }
}

function* getFreeBoards() {
    try {
        const freeBoards = yield call(getFreeBoard);
        yield put(getFreeBoardSuccess(freeBoards));
    } catch (err) {
        console.log(err);
        yield put(getFreeBoardFailure(err.message));
    }
}

function* deleteFreeBoard({ payload }: PayloadAction<string>) {
    try {
        yield call(deleteFreeBoardPost, payload);
        yield put(delFreeBoardSuccess(payload));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(delFreeBoardFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

// watch

function* watchFreeBoardSubmit() {
    yield takeLatest(freeBoardWriteSubmit, freeBoardSubmit);
}

function* watchFreeBoardUpdate() {
    yield takeLatest(freeBoardWriteUpdate, freeBoardUpdate);
}

function* watchGetFreeBoard() {
    yield takeLatest(getFreeBoardRequest, getFreeBoards);
}

function* watchGetFreeBoardById() {
    yield takeLatest(getFreeBoardByIdRequest, getFreeBoardById);
}

function* watchDelFreeBoard() {
    yield takeLatest(delFreeBoardRequest, deleteFreeBoard);
}

export default function* freeBoard(): Generator {
    yield all([
        fork(watchFreeBoardSubmit),
        fork(watchFreeBoardUpdate),
        fork(watchGetFreeBoardById),
        fork(watchGetFreeBoard),
        fork(watchDelFreeBoard),
    ]);
}
