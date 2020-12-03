import { combineReducers } from "@reduxjs/toolkit";

import loading from "./loading";
import ranking from "./ranking";

const rootReducer = combineReducers({
    loading,
    ranking,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
