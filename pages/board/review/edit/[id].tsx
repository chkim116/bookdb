import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import ReviewEditForm from "../../../../components/board/review/edit/ReviewEditForm";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import { getReviewByIdRequest } from "../../../../redux/review";
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

    useEffect(() => {
        dispatch(getReviewByIdRequest(id));
    }, []);

    return (
        <Container color={theme.white}>
            <ReviewEditForm reviewById={reviewById} />
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx;

    const cookie = ctx.req.headers.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch(authRequest());
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default index;
