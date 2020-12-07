import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData } from "../@types/types";

export type SearchState = {
    searchData: BookData[];
    error?: null | string;
};

export type SearchPayload = {
    searchText: string | number;
};

const initialState: SearchState = {
    searchData: [
        {
            title: "",
            author: "",
            description: "",
            image: "",
            link: "",
            publisher: "",
            pubdate: "",
            isbn: "",
        },
    ],
    error: null,
};

const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        getSearchRequest: (
            state,
            { payload }: PayloadAction<SearchPayload>
        ) => {
            state = initialState;
        },
        getSearchSuccess: (state, { payload }: PayloadAction<BookData[]>) => {
            state.searchData = payload;
        },
        getSearchFailure: (state, { payload }) => {
            state.error = payload;
            state.searchData = state.searchData.filter(
                (f) => f.title === undefined
            );
        },
    },
});

export const {
    getSearchRequest,
    getSearchSuccess,
    getSearchFailure,
} = search.actions;

export default search.reducer;
