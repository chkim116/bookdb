import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, debounce, put, fork, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { BookData, SelectedBook } from "../@types/types";
import {
    delReviewFailure,
    delReviewRequest,
    delReviewSuccess,
    getRecentPostFailure,
    getRecentPostRequest,
    getRecentPostSuccess,
    getReviewByIdFailure,
    getReviewByIdRequest,
    getReviewByIdSuccess,
    getReviewsPostFailure,
    getReviewsPostRequest,
    getReviewsPostSuccess,
    getSelectBookFailure,
    getSelectBookRequest,
    getSelectBookSuccess,
    reviewRouter,
    reviewWriteSubmit,
    reviewWriteUpdate,
    selectBookFailure,
    selectBookRequest,
    selectBookSuccess,
} from "../redux/review";
import { SearchPayload } from "../redux/search";
import { loadFailure, loadSuccess } from "../redux/loading";
import { WriteText } from "../@types/types";
import reduxSaga from "redux-saga";

// ajax

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function postSubmit(text: WriteText) {
    return Axios.post("/review/post", text).then((res) => res.data);
}

function postUpdate(text: WriteText) {
    return Axios.put("/review/edit", text);
}

function getReviewId(id: string | string[]) {
    return Axios.get(`/review/${id}`).then((res) => res.data);
}

function getReview() {
    return Axios.get("/review").then((res) => res.data);
}

function getRecentRequest() {
    return Axios.get("/review/recent").then((res) => res.data);
}

function deleteReviewPost(id: string) {
    return Axios.delete(`/review/del/${id}`);
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
        const review = yield call(postSubmit, payload);
        yield put(reviewRouter(review._id));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loadFailure(err.message));
    }
}

function* reviewUpdate({ payload }: PayloadAction<WriteText>) {
    try {
        yield call(postUpdate, payload);
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(loadFailure(err.message));
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

function* getRecent() {
    try {
        const reviews = yield call(getRecentRequest);
        yield put(getRecentPostSuccess(reviews));
    } catch (err) {
        console.log(err);
        yield put(getRecentPostFailure(err.message));
    }
}

function* deleteReview({ payload }: PayloadAction<string>) {
    try {
        yield call(deleteReviewPost, payload);
        yield put(delReviewSuccess(payload));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(delReviewFailure(err.message));
        yield put(loadFailure());
    }
}

// watch

function* watchSelectBook() {
    yield takeLatest(selectBookRequest, isSelected);
}

function* watchSearchBook() {
    yield debounce(500, getSelectBookRequest, getSearching);
}

function* watchReviewSubmit() {
    yield takeLatest(reviewWriteSubmit, reviewSubmit);
}

function* watchReviewUpdate() {
    yield takeLatest(reviewWriteUpdate, reviewUpdate);
}

function* watchGetReviewById() {
    yield takeLatest(getReviewByIdRequest, getReviewById);
}

function* watchGetReviews() {
    yield takeLatest(getReviewsPostRequest, getReviews);
}

function* watchGetRecent() {
    yield takeLatest(getRecentPostRequest, getRecent);
}

function* watchDelReview() {
    yield takeLatest(delReviewRequest, deleteReview);
}

export default function* review(): Generator {
    yield all([
        fork(watchSearchBook),
        fork(watchSelectBook),
        fork(watchReviewSubmit),
        fork(watchReviewUpdate),
        fork(watchGetReviewById),
        fork(watchGetReviews),
        fork(watchDelReview),
        fork(watchGetRecent),
    ]);
}
