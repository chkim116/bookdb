import { useFindId, useFormInput, useInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookData } from "../../../../@types/types";
import ReviewWrite from "../../../../components/board/review/write/ReviewWrite";
import PleaseLogin from "../../../../components/Common/PleaseLogin";
import { Seo } from "../../../../head/Seo";
import { useMore } from "../../../../hook";
import { RootState } from "../../../../redux";
import { loadRequest } from "../../../../redux/loading";
import {
    getSelectBookFailure,
    getSelectBookRequest,
    reviewWriteSubmit,
    selectBookRequest,
} from "../../../../redux/review";
import { writeTitle } from "../../../../redux/write";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchText, onChange, setSearchText] = useInput("");
    const [write, onWrite] = useFormInput();
    const [findId, onFindId] = useFindId();
    const { user } = useSelector((state: RootState) => state.auth);
    const { title, content, rating } = useSelector(
        (state: RootState) => state.write
    );
    const selectBook = useSelector(
        (state: RootState) => state.review.selectedBook
    );
    const results: BookData[] = useSelector(
        (state: RootState) => state.review.searchData
    );
    const { reviewRouter, isSubmit } = useSelector(
        (state: RootState) => state.review
    );

    const [onMore, display] = useMore({
        length: results.length,
        initial: 10,
        count: 10,
        limit: 100,
    });

    // 검색창 닫기
    const onClick = useCallback(() => {
        setSearchText((prev) => "");
        dispatch(getSelectBookFailure({ message: "닫기" }));
    }, [dispatch]);

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            if (title === "" || content === "" || rating === "") {
                return alert("본문을 다 입력해주세요");
            }

            dispatch(loadRequest());
            dispatch(
                reviewWriteSubmit({
                    title,
                    content,
                    regDate: new Date().toLocaleDateString(),
                    rating,
                    selectedBook: selectBook,
                    id: user.id ? user.id : "",
                    nickname: user.nickname ? user.nickname : "",
                })
            );
        },
        [title, content, dispatch, reviewRouter, selectBook, rating]
    );

    useEffect(() => {
        if (isSubmit) {
            router.push(`/board/review/detail/${reviewRouter}`);
        }
    }, [isSubmit]);

    // content 작성 로직은 RichTextEditor.tsx에 있습니다.
    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 리뷰할 책 검색
    useEffect(() => {
        if (searchText !== "") {
            dispatch(getSelectBookRequest({ searchText, display }));
        } else {
            dispatch(getSelectBookFailure({ message: "입력 값이 없습니다." }));
        }
    }, [searchText, display]);

    // 리뷰할 책 선택
    useEffect(() => {
        const find = findId.replace(/<[^>]*>?/gm, "").split("&&");
        const selectedBook = {
            title: find[0],
            author: find[1],
            image: find[2],
            isbn: find[3],
        };
        dispatch(selectBookRequest(selectedBook));
        setSearchText("");
    }, [findId]);

    const data = {
        title: `리뷰 글 작성`,
        description: "별점으로 책을 평가하고 리뷰를 남겨보세요!, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container color={theme.white}>
            <Seo data={data} />
            {user.id ? (
                <ReviewWrite
                    onMore={onMore}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onWrite={onWrite}
                    onFindId={onFindId}
                    selectBook={selectBook}
                    results={results}
                    searchText={searchText}
                    onClick={onClick}
                />
            ) : (
                <PleaseLogin />
            )}
        </Container>
    );
};

export default index;
