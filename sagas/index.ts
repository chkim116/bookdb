import { all, fork } from "redux-saga/effects";
import search from "./search";
import review from "./review";
import freeBoard from "./freeBoard";
import auth from "./auth";
import Axios from "axios";

Axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://bookdb-b.herokuapp.com/"
        : "http://localhost:4000/";
Axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(search), fork(review), fork(freeBoard), fork(auth)]);
}
