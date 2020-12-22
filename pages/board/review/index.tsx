import React, { useCallback } from "react";
import Review from "../../../components/board/review/Review";
import { Container } from "../../../styles/CommonStyle";
import { GetServerSideProps } from "next";
import wrapper from "../../../store/configureStore";
import { delReviewRequest, getReviewsPostRequest } from "../../../redux/review";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { loadRequest } from "../../../redux/loading";
import { useRouter } from "next/dist/client/router";
import { Seo } from "../../../head/Seo";

const index = () => {
    const { reviews } = useSelector((state: RootState) => state.review);
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
        title: `리뷰`,
        description: "리뷰를 볼 수 있는 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            <Review
                reviewPost={reviews}
                onDelete={onDelete}
                onEdit={onEdit}></Review>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store } = ctx;

        store.dispatch(getReviewsPostRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
