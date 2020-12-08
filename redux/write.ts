import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    title: string;
    content: string;
    rating?: string;
    thumb?: string;
    regDate: string;
};

const initialState: InitialState = {
    title: "",
    content: "",
    rating: "",
    thumb: "",
    regDate: "",
};

const write = createSlice({
    name: "write",
    initialState,
    reducers: {
        writeTitle: (state, { payload }) => {
            state.title = payload.title;
        },
        writeContent: (state, { payload }) => {
            state.content = payload.content;
        },
        writeRating: (state, { payload }) => {
            state.rating = payload.rating;
        },
    },
});

export const { writeTitle, writeContent, writeRating } = write.actions;

export default write.reducer;
