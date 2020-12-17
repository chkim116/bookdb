import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, ReviewPost, SelectedBook, WriteText } from "../@types/types";
import { SearchPayload } from "./search";

export type ReviewState = {
    selectedBook: SelectedBook;
    searchData: BookData[];
    isReviewErr: string | null;
    isSelect: boolean;
    reviewById: ReviewPost;
    reviews: ReviewPost[];
    reviewRouter: string;
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
        password: "",
        count: 0,
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
            password: "",
            count: 0,
            selectedBook: {
                title: "",
                author: "",
                image: "",
                isbn: "",
            },
        },
    ],
    isReviewErr: null,
    isSelect: false,
    reviewRouter: "",
};

const review = createSlice({
    name: "review",
    initialState,
    reducers: {
        selectBookRequest: (state, { payload }) => {
            isSelect: false;
            state.selectedBook = state.selectedBook;
        },
        selectBookSuccess: (state, { payload }) => {
            isSelect: true;
            state.selectedBook = payload;
        },
        selectBookFailure: (state, { payload }) => {
            isSelect: false;
            state.isReviewErr = payload;
            state.selectedBook.title = "";
            state.selectedBook.image = "";
            state.selectedBook.author = "";
            state.selectedBook.isbn = "";
        },

        getSelectBookRequest: (state, { payload }) => {
            state = initialState;
        },
        getSelectBookSuccess: (state, { payload }) => {
            state.searchData = payload;
        },
        getSelectBookFailure: (state, { payload }) => {
            state.isReviewErr = payload;
            state.searchData = state.searchData.filter((f) => f.title === "");
        },

        reviewWriteSubmit: (state, { payload }) => {},
        reviewWriteUpdate: (state, { payload }) => {},
        reviewRouter: (state, { payload }) => {
            state.reviewRouter = payload;
        },
        getReviewByIdRequest: (state, { payload }) => {
            state.isReviewErr = null;
        },
        getReviewByIdSuccess: (state, { payload }) => {
            state.reviewById = payload;
        },
        getReviewByIdFailure: (state, { payload }) => {
            state.isReviewErr = payload;
        },

        getRecentPostRequest: (state) => {
            state.isReviewErr = null;
        },
        getRecentPostSuccess: (state, { payload }) => {
            state.reviews = payload;
        },
        getRecentPostFailure: (state, { payload }) => {
            state.isReviewErr = payload;
        },

        getReviewsPostRequest: (state) => {
            state.isReviewErr = null;
        },
        getReviewsPostSuccess: (state, { payload }) => {
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
    reviewRouter,
    reviewWriteSubmit,
    reviewWriteUpdate,
    getRecentPostRequest,
    getRecentPostSuccess,
    getRecentPostFailure,
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
