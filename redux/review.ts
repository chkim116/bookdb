import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, SelectedBook, WriteText } from "../@types/types";
import { SearchPayload } from "./search";

export type ReviewState = {
    selectedBook: SelectedBook;
    searchData: BookData[];
    error: string | null;
    title: string;
    content: string;
    regDate: Date;
};

const initialState: ReviewState = {
    title: "",
    content: "",
    regDate: new Date(),
    selectedBook: {
        title: "",
        image: "",
        author: "",
        isbn: "",
    },
    searchData: [
        {
            title: "",
            description: "",
            image: "",
            author: "",
            isbn: "",
        },
    ],
    error: null,
};

const review = createSlice({
    name: "review",
    initialState,
    reducers: {
        selectBookRequest: (
            state,
            { payload }: PayloadAction<SelectedBook>
        ) => {
            state.selectedBook = state.selectedBook;
        },
        selectBookSuccess: (
            state,
            { payload }: PayloadAction<SelectedBook>
        ) => {
            state.selectedBook = payload;
        },
        selectBookFailure: (state, { payload }) => {
            state.error = payload;
            state.selectedBook.title = "";
            state.selectedBook.image = "";
            state.selectedBook.author = "";
            state.selectedBook.isbn = "";
        },

        getSelectBookRequest: (
            state,
            { payload }: PayloadAction<SearchPayload>
        ) => {
            state = initialState;
        },
        getSelectBookSuccess: (
            state,
            { payload }: PayloadAction<BookData[]>
        ) => {
            state.searchData = payload;
        },
        getSelectBookFailure: (state, { payload }) => {
            state.error = payload;
            state.searchData = state.searchData.filter((f) => f.title === "");
        },

        writeTitle: (state, { payload }) => {
            state.title = payload.title;
        },
        writeContent: (state, { payload }) => {
            state.content = payload.content;
        },
        writeSubmit: (state, { payload }: PayloadAction<WriteText>) => {
            state.error = null;
        },
    },
});

export const {
    selectBookRequest,
    selectBookSuccess,
    selectBookFailure,
    getSelectBookRequest,
    getSelectBookSuccess,
    getSelectBookFailure,
    writeTitle,
    writeContent,
    writeSubmit,
} = review.actions;

export default review.reducer;
