import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, SearchResults } from "../@types/types";

export type SearchState = {
    searchData: BookData[];
    searchResults: SearchResults[];
    error?: null | string;
};

export type SearchPayload = {
    searchText: string | number | string[];
    display: number;
};

const initialState: SearchState = {
    searchData: [
        {
            title: "",
            author: "",
            description: "",
            image: "",
            isbn: "",
        },
    ],
    searchResults: [
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
        // 헤더 검색창
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

        // 검색된 목록
        getSearchResultRequest: (
            state,
            { payload }: PayloadAction<SearchPayload>
        ) => {
            state = initialState;
        },
        getSearchResultSuccess: (
            state,
            { payload }: PayloadAction<SearchResults[]>
        ) => {
            state.searchResults = payload;
        },
        getSearchResultFailure: (state, { payload }) => {
            state.error = payload;
            state.searchResults = state.searchResults.filter(
                (f) => f.title === undefined
            );
        },
    },
});

export const {
    getSearchRequest,
    getSearchSuccess,
    getSearchFailure,
    getSearchResultRequest,
    getSearchResultSuccess,
    getSearchResultFailure,
} = search.actions;

export default search.reducer;
