import { all, fork } from "redux-saga/effects";
import search from "./search";
import review from "./review";
import freeBoard from "./freeBoard";
import auth from "./auth";

export default function* rootSaga() {
    yield all([fork(search), fork(review), fork(freeBoard), fork(auth)]);
}
