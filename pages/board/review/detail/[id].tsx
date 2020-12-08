import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import ReviewDetail from "../../../../components/board/review/detail/ReviewDetail";
import { RootState } from "../../../../redux";
import { getReviewByIdRequest } from "../../../../redux/review";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const { reviewById } = useSelector((state: RootState) => state.review);

    return (
        <Container color={theme.white}>
            <ReviewDetail reviewById={reviewById}></ReviewDetail>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store, params } = ctx;

        store.dispatch(getReviewByIdRequest(params.id));

        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
