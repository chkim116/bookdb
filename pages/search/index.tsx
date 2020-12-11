import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import SearchBoardForm from "../../components/search/SearchBoardForm";
import { RootState } from "../../redux";
import { authRequest } from "../../redux/auth";
import { getSearchFailure, getSearchResultRequest } from "../../redux/search";
import wrapper from "../../store/configureStore";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const dispatch = useDispatch();

    const results = useSelector(
        (state: RootState) => state.search.searchResults
    );
    const router = useRouter();
    const text = Object.values(router.query)[0].toString();

    useEffect(() => {
        dispatch(getSearchFailure({ message: "이미 검색했으니 끌게요~" }));
        dispatch(getSearchResultRequest({ searchText: text }));
    }, [router.query]);

    return (
        <Container>
            <SearchBoardForm results={results} text={text} />
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx;

    const cookie = ctx.req.headers.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch(authRequest());
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default index;
