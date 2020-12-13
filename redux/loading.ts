import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Loading = {
    isLoading: boolean;
    isError: string | null | any;
    isDone: boolean;
};

const initialState: Loading = {
    isLoading: false,
    isError: null,
    isDone: false,
};

const loading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadRequest: (state) => {
            state.isLoading = true;
            state.isError = null;
            state.isDone = false;
        },
        loadSuccess: (state) => {
            state.isLoading = false;
            state.isDone = true;
        },
        loadFailure: (state, { payload }) => {
            state.isLoading = false;
            state.isError = payload;
            state.isDone = false;
        },
    },
});

export const { loadRequest, loadSuccess, loadFailure } = loading.actions;

export default loading.reducer;
