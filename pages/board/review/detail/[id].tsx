import Axios from "axios";

import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import ReviewDetail from "../../../../components/board/review/detail/ReviewDetail";
import { Seo } from "../../../../head/Seo";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import { loadRequest } from "../../../../redux/loading";
import {
    delReviewRequest,
    getReviewByIdRequest,
} from "../../../../redux/review";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const { reviewById } = useSelector((state: RootState) => state.review);
    const dispatch = useDispatch();
    const router = useRouter();

    const onDelete = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;

            if (window.confirm("삭제하십니까?")) {
                dispatch(loadRequest());
                dispatch(delReviewRequest(id));
                router.push(`/board/review`);
            }
        },
        [dispatch, router]
    );

    const onEdit = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;
            router.push(`/board/review/edit/${id}`);
        },
        [router]
    );

    const data = {
        title: `${reviewById.title}`,
        description: "리뷰한 게시글 디테일 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container color={theme.white}>
            <Seo data={data} />
            <ReviewDetail
                reviewById={reviewById}
                onDelete={onDelete}
                onEdit={onEdit}></ReviewDetail>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store, params } = ctx;

        const cookie = ctx.req?.headers?.cookie;
        Axios.defaults.headers.Cookie = "";

        if (ctx.req && cookie) {
            Axios.defaults.headers.Cookie = cookie;
            store.dispatch(authRequest());
        }
        store.dispatch(getReviewByIdRequest(params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
