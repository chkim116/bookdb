import { all, fork } from "redux-saga/effects";
import search from "./search";
import review from "./review";
import freeBoard from "./freeBoard";

export default function* rootSaga() {
    yield all([fork(search), fork(review), fork(freeBoard)]);
}
