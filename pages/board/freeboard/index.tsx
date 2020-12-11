import Axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoard from "../../../components/board/freeboard/FreeBoard";
import { RootState } from "../../../redux";
import { authRequest } from "../../../redux/auth";
import {
    delFreeBoardRequest,
    getFreeBoardRequest,
} from "../../../redux/freeBoard";
import { loadRequest } from "../../../redux/loading";
import wrapper from "../../../store/configureStore";
import { Container } from "../../../styles/CommonStyle";

const index = () => {
    const { freeBoards } = useSelector((state: RootState) => state.freeBoard);
    const dispatch = useDispatch();
    const router = useRouter();

    const onDelete = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;

            if (window.confirm("삭제하십니까?")) {
                dispatch(loadRequest());
                dispatch(delFreeBoardRequest(id));
                router.push(`/board/freeboard`);
            }
        },
        [dispatch, router]
    );

    const onEdit = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;
            router.push(`/board/freeboard/edit/${id}`);
        },
        [router]
    );

    return (
        <Container>
            <FreeBoard
                freeBoards={freeBoards}
                onDelete={onDelete}
                onEdit={onEdit}></FreeBoard>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store } = ctx;

        const cookie = ctx.req?.headers?.cookie;
        Axios.defaults.headers.Cookie = "";

        if (ctx.req && cookie) {
            Axios.defaults.headers.Cookie = cookie;
            store.dispatch(authRequest());
        }
        store.dispatch(getFreeBoardRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
