import Axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoard from "../../../components/board/freeboard/FreeBoard";
import { RootState } from "../../../redux";
import { authRequest } from "../../../redux/auth";
import { getFreeBoardRequest } from "../../../redux/freeBoard";
import wrapper from "../../../store/configureStore";
import { Container } from "../../../styles/CommonStyle";

const index = () => {
    const { freeBoards } = useSelector((state: RootState) => state.freeBoard);

    return (
        <Container>
            <FreeBoard freeBoards={freeBoards}></FreeBoard>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store } = ctx;
        const cookie = ctx.req.headers.cookie;
        Axios.defaults.headers.Cookie = "";

        if (ctx.req && cookie) {
            Axios.defaults.headers.Cookie = cookie;
        }
        store.dispatch(authRequest());
        store.dispatch(getFreeBoardRequest());
        store.dispatch(END);

        await store.sagaTask.toPromise();
    }
);

export default index;
