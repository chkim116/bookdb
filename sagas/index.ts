import { all, fork } from "redux-saga/effects";
import ranking from "./ranking";

export default function* rootSaga() {
    yield all([fork(ranking)]);
}
