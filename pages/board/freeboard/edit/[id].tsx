import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoardEditForm from "../../../../components/board/freeboard/edit/FreeBoardEditForm";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import {
    freeBoardWriteUpdate,
    getFreeBoardByIdRequest,
} from "../../../../redux/freeBoard";
import { loadRequest } from "../../../../redux/loading";
import { writeTitle } from "../../../../redux/write";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const router = useRouter();
    const {
        query: { id },
    } = router;

    const dispatch = useDispatch();
    const { freeBoardById } = useSelector(
        (state: RootState) => state.freeBoard
    );
    const [write, onWrite] = useFormInput();
    const { title, content } = useSelector((state: RootState) => state.write);

    // 기존 게시글 불러오기

    useEffect(() => {
        dispatch(getFreeBoardByIdRequest(id));
    }, []);

    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(
                freeBoardWriteUpdate({
                    title: title ? title : freeBoardById.title,
                    content: content ? content : freeBoardById.content,
                    id,
                    regDate: new Date().toLocaleDateString(),
                })
            );
            router.push("/board/freeboard");
        },
        [title, content, dispatch, router, id, freeBoardById]
    );

    return (
        <Container color={theme.white}>
            <FreeBoardEditForm
                freeBoardById={freeBoardById}
                onWrite={onWrite}
                onSubmit={onSubmit}
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
