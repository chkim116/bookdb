import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { loadFailure, loadSuccess } from "../redux/loading";

function* getBestSeller({ payload }: PayloadAction<string>) {}

function* watchGetBestSeller() {}

export default function* ranking(): Generator {}
