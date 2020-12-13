import { PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import {
    all,
    call,
    debounce,
    fork,
    put,
    takeLatest,
    throttle,
} from "redux-saga/effects";
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
import { loadFailure, loadSuccess } from "../redux/loading";

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}
function getResult(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function* getSearching({ payload }: PayloadAction<SearchPayload>) {
    try {
        if (payload.searchText === "") {
            return yield put(
                getSearchFailure({ message: "입력 값이 없습니다." })
            );
        }
        const data: BookData[] = yield call(getSearch, payload);
        yield put(getSearchSuccess(data));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(getSearchFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

function* getResults({ payload }: PayloadAction<SearchPayload>) {
    try {
        const data: SearchResults[] = yield call(getResult, payload);
        yield put(getSearchFailure({ message: "이미 검색했으니 끌게요~" }));
        yield put(getSearchResultSuccess(data));
        yield put(loadSuccess());
    } catch (err) {
        console.log(err);
        yield put(getSearchResultFailure(err.message));
        yield put(loadFailure(err.message));
    }
}

function* watchGetSearch() {
    yield debounce(300, getSearchRequest, getSearching);
}

function* watchSearchResults() {
    yield takeLatest(getSearchResultRequest, getResults);
}

export default function* search(): Generator {
    yield all([fork(watchGetSearch), fork(watchSearchResults)]);
}
