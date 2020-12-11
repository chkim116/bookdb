import React from "react";
import Review from "../../../components/board/review/Review";
import { Container } from "../../../styles/CommonStyle";
import { GetServerSideProps } from "next";
import wrapper from "../../../store/configureStore";
import { getReviewsPostRequest } from "../../../redux/review";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { authRequest } from "../../../redux/auth";
import Axios from "axios";

const index = () => {
    const { reviews } = useSelector((state: RootState) => state.review);

    return (
        <Container>
            <Review reviewPost={reviews}></Review>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store } = ctx;
        store.dispatch(getReviewsPostRequest());

        const cookie = ctx.req.headers.cookie;
        Axios.defaults.headers.Cookie = "";

        if (ctx.req && cookie) {
            Axios.defaults.headers.Cookie = cookie;
        }
        store.dispatch(authRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
