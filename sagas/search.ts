import { PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { all, call, debounce, fork, put } from "redux-saga/effects";
import {
    getSearchFailure,
    getSearchRequest,
    getSearchSuccess,
    SearchPayload,
} from "../redux/search";
import { BookData } from "../@types/types";

function getSearch(text: SearchPayload) {
    return Axios.post("/search", text).then((res) => res.data.items);
}

function* getSearching({ payload }: PayloadAction<SearchPayload>) {
    try {
        const data: BookData[] = yield call(getSearch, payload);
        yield put(getSearchSuccess(data));
    } catch (err) {
        console.log(err);
        yield put(getSearchFailure(err.message));
    }
}

function* watchGetSearch() {
    yield debounce(500, getSearchRequest, getSearching);
}

export default function* search(): Generator {
    yield all([fork(watchGetSearch)]);
}
