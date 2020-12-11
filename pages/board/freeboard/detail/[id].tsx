import Axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoardDetail from "../../../../components/board/freeboard/detail/FreeBoardDetail";
import { RootState } from "../../../../redux";
import { authRequest } from "../../../../redux/auth";
import {
    delFreeBoardRequest,
    getFreeBoardByIdRequest,
} from "../../../../redux/freeBoard";
import { loadRequest } from "../../../../redux/loading";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const { freeBoardById } = useSelector(
        (state: RootState) => state.freeBoard
    );
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
        <Container color={theme.white}>
            <FreeBoardDetail
                freeBoardById={freeBoardById}
                onDelete={onDelete}
                onEdit={onEdit}
            />
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
        store.dispatch(getFreeBoardByIdRequest(params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
