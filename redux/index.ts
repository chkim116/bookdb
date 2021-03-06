import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import loading from "./loading";
import search from "./search";
import review from "./review";
import freeBoard from "./freeBoard";
import write from "./write";
import auth from "./auth";

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                loading,
                search,
                review,
                freeBoard,
                write,
                auth,
            });
            return combineReducer(state, action);
        }
    }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
