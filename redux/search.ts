import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, SearchResults } from "../@types/types";

export type SearchState = {
    searchData: BookData[];
    searchResults: SearchResults[];
    error?: null | string;
    isSearch: boolean;
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
    isSearch: false,
    error: null,
};

const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        // 헤더 검색창
        getSearchRequest: (state, { payload }) => {
            state = initialState;
            state.isSearch = false;
        },
        getSearchSuccess: (state, { payload }) => {
            state.searchData = payload;
            state.isSearch = true;
        },
        getSearchFailure: (state, { payload }) => {
            state.error = payload;
            state.isSearch = false;
            state.searchData = state.searchData.filter(
                (f) => f.title === undefined
            );
        },

        // 검색된 목록
        getSearchResultRequest: (state, { payload }) => {
            state = initialState;
            state.isSearch = false;
        },
        getSearchResultSuccess: (state, { payload }) => {
            state.searchResults = payload;
            state.isSearch = true;
        },
        getSearchResultFailure: (state, { payload }) => {
            state.isSearch = false;
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
