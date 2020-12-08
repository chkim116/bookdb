import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, debounce, put, fork, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { BookData, SelectedBook } from "../@types/types";
import {
    getReviewByIdFailure,
    getReviewByIdRequest,
    getReviewByIdSuccess,
    getReviewsPostFailure,
    getReviewsPostRequest,
    getReviewsPostSuccess,
    getSelectBookFailure,
    getSelectBookRequest,
    getSelectBookSuccess,
    reviewWriteSubmit,
    selectBookFailure,
    selectBookRequest,
    selectBookSuccess,
} from "../redux/review";
import { SearchPayload } from "../redux/search";
import { loadFailure, loadSuccess } from "../redux/loading";
import { WriteText } from "../@types/types";

// ajax

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function postSubmit(text: WriteText) {
    return Axios.post("/review/post", text);
}

function getReviewId(id: string | string[]) {
    return Axios.get(`/review/${id}`).then((res) => res.data);
}

function getReview() {
    return Axios.get("/review").then((res) => res.data);
}

// call & put

function* getSearching({ payload }: PayloadAction<SearchPayload>) {
    try {
        if (payload.searchText === "") {
            return yield put(
                getSelectBookFailure({ message: "입력 값이 없습니다." }) // 검색창 끄기
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
        yield put(getSelectBookFailure({ message: "책을 선택했습니다." })); // 검색창 끄기
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

function* getReviewById({ payload }: PayloadAction<string | string[]>) {
    try {
        const review = yield call(getReviewId, payload);
        yield put(getReviewByIdSuccess(review));
    } catch (err) {
        console.log(err);
        yield put(getReviewByIdFailure(err.message));
    }
}

function* getReviews() {
    try {
        const reviews = yield call(getReview);
        yield put(getReviewsPostSuccess(reviews));
    } catch (err) {
        console.log(err);
        yield put(getReviewsPostFailure(err.message));
    }
}

// watch

function* watchSelectBook() {
    yield takeLatest(selectBookRequest, isSelected);
}

function* watchSearchBook() {
    yield debounce(300, getSelectBookRequest, getSearching);
}

function* watchReviewSubmit() {
    yield takeLatest(reviewWriteSubmit, reviewSubmit);
}

function* watchGetReviewById() {
    yield takeLatest(getReviewByIdRequest, getReviewById);
}

function* watchGetReviews() {
    yield takeLatest(getReviewsPostRequest, getReviews);
}

export default function* review(): Generator {
    yield all([
        fork(watchSearchBook),
        fork(watchSelectBook),
        fork(watchReviewSubmit),
        fork(watchGetReviewById),
        fork(watchGetReviews),
    ]);
}
