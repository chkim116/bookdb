import { all, fork } from "redux-saga/effects";
import search from "./search";
import review from "./review";

export default function* rootSaga() {
    yield all([fork(search), fork(review)]);
}
