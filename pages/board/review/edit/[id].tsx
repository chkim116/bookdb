import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import ReviewEditForm from "../../../../components/board/review/edit/ReviewEditForm";
import { Seo } from "../../../../head/Seo";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import { loadRequest } from "../../../../redux/loading";
import {
    getReviewByIdRequest,
    reviewWriteUpdate,
} from "../../../../redux/review";
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
    const { reviewById } = useSelector((state: RootState) => state.review);
    const [write, onWrite] = useFormInput();
    const { title, content } = useSelector((state: RootState) => state.write);
    const { user } = useSelector((state: RootState) => state.auth);
    // 수정할 게시글 불러오기

    useEffect(() => {
        dispatch(getReviewByIdRequest(id));
    }, []);

    // title 작성 (content 작성 로직은 RichTextEditor에 있음)

    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 폼 제출 시
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(
                reviewWriteUpdate({
                    title: title ? title : reviewById.title,
                    content: content ? content : reviewById.content,
                    id,
                })
            );
            router.push(`/board/review/detail/${reviewById._id}`);
        },
        [title, content, dispatch, id, router, reviewById]
    );

    const data = {
        title: `${reviewById.title} 수정하기`,
        description: "리뷰 게시글 수정, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container color={theme.white}>
            <Seo data={data} />
            <ReviewEditForm
                onSubmit={onSubmit}
                reviewById={reviewById}
                onWrite={onWrite}
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
