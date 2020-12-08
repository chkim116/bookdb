import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, debounce, put, fork, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { BookData, SelectedBook } from "../@types/types";
import {
    getSelectBookFailure,
    getSelectBookRequest,
    getSelectBookSuccess,
    selectBookFailure,
    selectBookRequest,
    selectBookSuccess,
    writeSubmit,
} from "../redux/review";
import { SearchPayload } from "../redux/search";
import { loadFailure, loadSuccess } from "../redux/loading";
import { WriteText } from "../@types/types";

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function postSubmit(text: WriteText) {
    // return Axios.post()
}

function* getSearching({ payload }: PayloadAction<SearchPayload>) {
    try {
        if (payload.searchText === "") {
            return yield put(
                getSelectBookFailure({ message: "입력 값이 없습니다." })
            );
        }
        const data: BookData[] = yield call(getSearch, payload);
        yield put(getSelectBookSuccess(data));
    } catch (err) {
        console.log(err);
        yield put(getSelectBookFailure(err.message));
    }
}

function* isSelected({ payload }: PayloadAction<SelectedBook>) {
    try {
        yield put(selectBookSuccess(payload));
        yield put(getSelectBookFailure({ message: "책을 선택했습니다." }));
    } catch (err) {
        console.log(err);
        yield put(selectBookFailure(err.messasge));
    }
}

function* reviewSubmit({ payload }: PayloadAction<WriteText>) {
    try {
        yield call(postSubmit, payload);
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loadFailure());
    }
}

function* watchSelectBook() {
    yield takeLatest(selectBookRequest, isSelected);
}

function* watchSearchBook() {
    yield debounce(100, getSelectBookRequest, getSearching);
}

function* watchReviewSubmit() {
    yield takeLatest(writeSubmit, reviewSubmit);
}

export default function* review(): Generator {
    yield all([
        fork(watchSearchBook),
        fork(watchSelectBook),
        fork(watchReviewSubmit),
    ]);
}