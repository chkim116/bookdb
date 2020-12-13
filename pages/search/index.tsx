import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import SearchBoardForm from "../../components/search/SearchBoardForm";
import { useScroll } from "../../hook";
import { RootState } from "../../redux";
import { authRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import { getSearchResultRequest } from "../../redux/search";
import wrapper from "../../store/configureStore";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const dispatch = useDispatch();
    const results = useSelector(
        (state: RootState) => state.search.searchResults
    );
    const router = useRouter();
    const text = Object.values(router.query)[0].toString();
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const viewPort = useRef<HTMLDivElement>();
    const [lastElement, display] = useScroll(viewPort.current, isLoading);

    useEffect(() => {
        dispatch(loadRequest());
        dispatch(getSearchResultRequest({ searchText: text, display }));
    }, [router.query, display]);

    return (
        <Container>
            <SearchBoardForm
                viewPort={viewPort}
                results={results}
                lastElement={lastElement}
                text={text}
            />
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx;

    const cookie = ctx.req?.headers?.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
        store.dispatch(authRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
});

export default index;
