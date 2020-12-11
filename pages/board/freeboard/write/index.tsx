import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoardWrite from "../../../../components/board/freeboard/write/FreeBoardWrite";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import { freeBoardWriteSubmit } from "../../../../redux/freeBoard";
import { loadRequest } from "../../../../redux/loading";
import { writeTitle } from "../../../../redux/write";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [write, onWrite] = useFormInput();
    const { title, content } = useSelector((state: RootState) => state.write);
    const { user } = useSelector((state: RootState) => state.auth);
    const { isDone } = useSelector((state: RootState) => state.loading);
    const { freeBoardRouter } = useSelector(
        (state: RootState) => state.freeBoard
    );

    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            if (title === "" && content === "") {
                return alert("제목과 글을 입력해주세요");
            }
            dispatch(loadRequest());
            dispatch(
                freeBoardWriteSubmit({
                    title,
                    content,
                    regDate: new Date().toLocaleDateString(),
                    id: user.id ? user.id : "",
                    nickname: user.nickname ? user.nickname : "",
                })
            );
        },
        [title, content, dispatch, router, freeBoardRouter]
    );

    useEffect(() => {
        if (isDone) {
            router.push(`/board/freeboard/detail/${freeBoardRouter}`);
        }
    }, [isDone]);

    return (
        <Container>
            <FreeBoardWrite onSubmit={onSubmit} onWrite={onWrite} />
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
