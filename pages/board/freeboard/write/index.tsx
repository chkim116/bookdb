import Axios from "axios";
import React from "react";
import { END } from "redux-saga";
import FreeBoardWrite from "../../../../components/board/freeboard/write/FreeBoardWrite";
import { authRequest } from "../../../../redux/auth";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";

const index = () => {
    return (
        <Container>
            <FreeBoardWrite />
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
