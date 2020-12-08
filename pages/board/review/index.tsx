import React, { useCallback } from "react";
import Review from "../../../components/board/review/Review";
import { Container } from "../../../styles/CommonStyle";
import { GetServerSideProps } from "next";
import wrapper from "../../../store/configureStore";
import { delReviewRequest, getReviewsPostRequest } from "../../../redux/review";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useRouter } from "next/dist/client/router";
import { loadRequest } from "../../../redux/loading";

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
            }
        },
        []
    );

    const onEdit = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;
            router.push(`/board/review/edit/${id}`);
        },
        []
    );

    return (
        <Container>
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
