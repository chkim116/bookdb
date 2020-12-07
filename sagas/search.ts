import { PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { all, call, debounce, fork, put, takeLatest } from "redux-saga/effects";
import {
    getSearchFailure,
    getSearchRequest,
    getSearchResultFailure,
    getSearchResultRequest,
    getSearchResultSuccess,
    getSearchSuccess,
    SearchPayload,
} from "../redux/search";
import { BookData, SearchResults } from "../@types/types";

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}
function getResult(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function* getSearching({ payload }: PayloadAction<SearchPayload>) {
    try {
        if (payload.searchText === "") {
            return;
        }
        const data: BookData[] = yield call(getSearch, payload);
        yield put(getSearchSuccess(data));
    } catch (err) {
        console.log(err);
        yield put(getSearchFailure(err.message));
    }
}

function* getResults({ payload }: PayloadAction<SearchPayload>) {
    try {
        const data: SearchResults[] = yield call(getResult, payload);
        yield put(getSearchFailure({ message: "이미 검색했으니 끌게요~" }));
        yield put(getSearchResultSuccess(data));
    } catch (err) {
        console.log(err);
        yield put(getSearchResultFailure(err.message));
    }
}

function* watchGetSearch() {
    yield debounce(100, getSearchRequest, getSearching);
}

function* watchSearchResults() {
    yield takeLatest(getSearchResultRequest, getResults);
}

export default function* search(): Generator {
    yield all([fork(watchGetSearch), fork(watchSearchResults)]);
}
