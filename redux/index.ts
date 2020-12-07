import { combineReducers } from "@reduxjs/toolkit";

import loading from "./loading";
import search from "./search";

const rootReducer = combineReducers({
    loading,
    search,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
