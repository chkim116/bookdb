import { createSlice } from "@reduxjs/toolkit";
import { BookData, ReviewPost, SelectedBook } from "../@types/types";

export type ReviewState = {
    selectedBook: SelectedBook;
    searchData: BookData[];
    isReviewErr: string | null;
    isSubmit: boolean;
    isRecent: boolean;
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
    isRecent: false,
    reviewRouter: "",
    isSubmit: false,
};

const review = createSlice({
    name: "review",
    initialState,
    reducers: {
        selectBookRequest: (state, { payload }) => {
            state.selectedBook = state.selectedBook;
        },
        selectBookSuccess: (state, { payload }) => {
            state.selectedBook = payload;
        },
        selectBookFailure: (state, { payload }) => {
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
            state.isSubmit = true;
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
            state.isRecent = false;
        },
        getRecentPostSuccess: (state, { payload }) => {
            state.reviews = payload;
            state.isRecent = true;
        },
        getRecentPostFailure: (state, { payload }) => {
            state.isReviewErr = payload;
            state.isRecent = true;
        },

        getReviewsPostRequest: (state) => {
            state.isReviewErr = null;
        },
        getReviewsPostSuccess: (state, { payload }) => {
            state.reviews = payload;
            state.isRecent = true;
        },
        getReviewsPostFailure: (state, { payload }) => {
            state.isReviewErr = payload;
            state.isRecent = true;
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
