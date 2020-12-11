import Axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoardDetail from "../../../../components/board/freeboard/detail/FreeBoardDetail";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import { getFreeBoardByIdRequest } from "../../../../redux/freeBoard";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const { freeBoardById } = useSelector(
        (state: RootState) => state.freeBoard
    );

    return (
        <Container color={theme.white}>
            <FreeBoardDetail freeBoardById={freeBoardById} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store, params } = ctx;

        const cookie = ctx.req.headers.cookie;
        Axios.defaults.headers.Cookie = "";

        if (ctx.req && cookie) {
            Axios.defaults.headers.Cookie = cookie;
        }
        store.dispatch(authRequest());
        store.dispatch(getFreeBoardByIdRequest(params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
