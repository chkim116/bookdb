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
} from "../redux/freeBoard";
import { WriteText } from "../@types/types";
import { loadFailure, loadSuccess } from "../redux/loading";

// ajax

function postSubmit(text: WriteText) {
    return Axios.post("/freeboard/post", text);
}

function postUpdate(text: WriteText) {
    return Axios.put("/freeboard/edit", text);
}

function getFreeBoardId(id: string | string[]) {
    return Axios.get(`/freeboard/${id}`).then((res) => res.data);
}

function getFreeBoard() {
    return Axios.get("/freeboard").then((res) => res.data);
}

function deleteFreeBoardPost(id: string) {
    return Axios.delete(`/freeboard/del/${id}`);
}

// call & put

function* freeBoardSubmit({ payload }: PayloadAction<WriteText>) {
    try {
        yield call(postSubmit, payload);
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
        yield put(loadFailure());
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
