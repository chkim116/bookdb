import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import loading from "./loading";
import search from "./search";
import review from "./review";

const rootReducer = combineReducers({
    // index: (state: any = {}, action) => {
    //     switch (action.type) {
    //         case HYDRATE:
    //             return { ...state, ...action.payload };
    //         default:
    //             return state;
    //     }
    // },
    loading,
    search,
    review,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
