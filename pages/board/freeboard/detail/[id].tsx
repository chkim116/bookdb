import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import FreeBoardDetail from "../../../../components/board/freeboard/detail/FreeBoardDetail";
import { RootState } from "../../../../redux";
import { getFreeBoardByIdRequest } from "../../../../redux/freeBoard";
import wrapper from "../../../../store/configureStore";
import { Container } from "../../../../styles/CommonStyle";

const index = () => {
    const { freeBoardById } = useSelector(
        (state: RootState) => state.freeBoard
    );

    return (
        <Container>
            <FreeBoardDetail freeBoardById={freeBoardById} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx) => {
        const { store, params } = ctx;

        store.dispatch(getFreeBoardByIdRequest(params.id));

        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);

export default index;
