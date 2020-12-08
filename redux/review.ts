import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, ReviewPost, SelectedBook, WriteText } from "../@types/types";
import { SearchPayload } from "./search";

export type ReviewState = {
    selectedBook: SelectedBook;
    searchData: BookData[];
    isReviewErr: string | null;
    reviewById: ReviewPost;
    reviews: ReviewPost[];
};

const initialState: ReviewState = {
    // 선택
    selectedBook: {
        title: "",
        image: "",
        author: "",
        isbn: "",
    },
    // 검색
    searchData: [
        {
            title: "",
            description: "",
            image: "",
            author: "",
            isbn: "",
        },
    ],
    // id마다의 리뷰
    reviewById: {
        _id: "",
        title: "",
        content: "",
        regDate: "",
        creator: "",
        userId: "",
        selectedBook: {
            title: "",
            author: "",
            image: "",
            isbn: "",
        },
    },
    // 모든 리뷰
    reviews: [
        {
            _id: "",
            title: "",
            content: "",
            regDate: "",
            creator: "",
            userId: "",
            selectedBook: {
                title: "",
                author: "",
                image: "",
                isbn: "",
            },
        },
    ],
    isReviewErr: null,
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
            state.isReviewErr = payload;
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
            state.isReviewErr = payload;
            state.searchData = state.searchData.filter((f) => f.title === "");
        },

        reviewWriteSubmit: (state, { payload }: PayloadAction<WriteText>) => {},
        reviewWriteUpdate: (state, { payload }: PayloadAction<WriteText>) => {},

        getReviewByIdRequest: (
            state,
            { payload }: PayloadAction<string | string[]>
        ) => {
            state.isReviewErr = null;
        },
        getReviewByIdSuccess: (
            state,
            { payload }: PayloadAction<ReviewPost>
        ) => {
            state.reviewById._id = payload._id;
            state.reviewById.title = payload.title;
            state.reviewById.content = payload.content;
            state.reviewById.regDate = payload.regDate;
            state.reviewById.creator = payload.creator;
            state.reviewById.rating = payload.rating;
            state.reviewById.userId = payload.userId;
            state.reviewById.selectedBook.title = payload.selectedBook.title;
            state.reviewById.selectedBook.author = payload.selectedBook.author;
            state.reviewById.selectedBook.image = payload.selectedBook.image;
            state.reviewById.selectedBook.isbn = payload.selectedBook.isbn;
        },
        getReviewByIdFailure: (state, { payload }) => {
            state.isReviewErr = payload;
        },

        getReviewsPostRequest: (state) => {
            state.isReviewErr = null;
        },
        getReviewsPostSuccess: (
            state,
            { payload }: PayloadAction<ReviewPost[]>
        ) => {
            state.reviews = payload;
        },
        getReviewsPostFailure: (state, { payload }) => {
            state.isReviewErr = payload;
        },

        delReviewRequest: (state, { payload }) => {
            state.isReviewErr = null;
        },
        delReviewSuccess: (state, { payload }) => {
            state.reviews = state.reviews.filter((r) => r._id !== payload);
        },
        delReviewFailure: (state, { payload }) => {
            state.isReviewErr = payload;
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

    reviewWriteSubmit,
    reviewWriteUpdate,
    getReviewByIdRequest,
    getReviewByIdSuccess,
    getReviewByIdFailure,
    getReviewsPostRequest,
    getReviewsPostSuccess,
    getReviewsPostFailure,
    delReviewRequest,
    delReviewSuccess,
    delReviewFailure,
} = review.actions;

export default review.reducer;
