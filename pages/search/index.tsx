import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { getSearchFailure, getSearchResultRequest } from "../../redux/search";

const index = () => {
    const dispatch = useDispatch();

    const results = useSelector(
        (state: RootState) => state.search.searchResults
    );
    const router = useRouter();
    const text = Object.values(router.query)[0];

    useEffect(() => {
        dispatch(getSearchFailure({ message: "이미 검색했으니 끌게요~" }));
        dispatch(getSearchResultRequest({ searchText: text }));
    }, [router.query]);

    return <div>g2</div>;
};

export default index;
