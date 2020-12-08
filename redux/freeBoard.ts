import { createSlice } from "@reduxjs/toolkit";

export type FreeBoard = {
    title: string;
    regDate: string;
    content: string;
    userId: string;
    thumb: string;
    _id: string;
};

type InitialState = {
    freeBoardById: FreeBoard;
    freeBoards: FreeBoard[];
    isFreeBoardErr: string | null;
};

const initialState: InitialState = {
    freeBoardById: {
        title: "",
        regDate: "",
        content: "",
        userId: "",
        thumb: "",
        _id: "",
    },
    freeBoards: [
        {
            title: "",
            regDate: "",
            content: "",
            userId: "",
            _id: "",
            thumb: "",
        },
    ],
    isFreeBoardErr: null,
};

const freeBoard = createSlice({
    name: "freeBoard",
    initialState,
    reducers: {
        getFreeBoardRequest: (state) => {
            state.isFreeBoardErr = null;
        },
        getFreeBoardSuccess: (state, { payload }) => {
            state.freeBoards = payload;
        },
        getFreeBoardFailure: (state, { payload }) => {
            state.isFreeBoardErr = payload;
        },

        getFreeBoardByIdRequest: (state, { payload }) => {
            state.isFreeBoardErr = null;
        },
        getFreeBoardByIdSuccess: (state, { payload }) => {
            state.freeBoardById.content = payload.cotent;
            state.freeBoardById.regDate = payload.regDate;
            state.freeBoardById.title = payload.title;
            state.freeBoardById.thumb = payload.thumb;
            state.freeBoardById.userId = payload.userId;
            state.freeBoardById._id = payload._id;
        },
        getFreeBoardByIdFailure: (state, { payload }) => {
            state.isFreeBoardErr = payload;
        },

        freeBoardWriteSubmit: (state, { payload }) => {},
        freeBoardWriteUpdate: (state, { payload }) => {},

        delFreeBoardRequest: (state, { payload }) => {
            state.isFreeBoardErr = null;
        },
        delFreeBoardSuccess: (state, { payload }) => {
            state.freeBoards = state.freeBoards.filter(
                (r) => r._id !== payload
            );
        },
        delFreeBoardFailure: (state, { payload }) => {
            state.isFreeBoardErr = payload;
        },
    },
});

export const {
    getFreeBoardRequest,
    getFreeBoardSuccess,
    getFreeBoardFailure,
    getFreeBoardByIdRequest,
    getFreeBoardByIdSuccess,
    getFreeBoardByIdFailure,
    freeBoardWriteSubmit,
    freeBoardWriteUpdate,
    delFreeBoardRequest,
    delFreeBoardSuccess,
    delFreeBoardFailure,
} = freeBoard.actions;

export default freeBoard.reducer;
