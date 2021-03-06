import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBoardForm from "../../components/search/SearchBoardForm";
import { Seo } from "../../head/Seo";
import { useScroll } from "../../hook";
import { RootState } from "../../redux";
import { loadRequest } from "../../redux/loading";
import { getSearchResultRequest } from "../../redux/search";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const dispatch = useDispatch();
    const results = useSelector(
        (state: RootState) => state.search.searchResults
    );
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const router = useRouter();
    const text = Object.values(router.query)[0].toString();
    const viewPort = useRef<HTMLDivElement>();
    const [lastElement, display] = useScroll({
        viewPort: viewPort.current,
        length: results.length,
        initial: 10,
        count: 10,
        limit: 100,
        isLoading: isLoading,
        query: router.query,
    });

    useEffect(() => {
        dispatch(loadRequest());
        dispatch(getSearchResultRequest({ searchText: text, display }));
    }, [router.query, display]);

    const data = {
        title: `${router.query.query} 검색결과`,
        description: "책 검색 결과 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            <SearchBoardForm
                viewPort={viewPort}
                results={results}
                lastElement={lastElement}
                text={text}
            />
        </Container>
    );
};

export default index;
