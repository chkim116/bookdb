import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FreeBoardEditForm from "../../../../components/board/freeboard/edit/FreeBoardEditForm";
import { RootState } from "../../../../redux";
import { getFreeBoardByIdRequest } from "../../../../redux/freeBoard";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const router = useRouter();
    const {
        query: { id },
    } = router;

    const dispatch = useDispatch();
    const { freeBoardById } = useSelector(
        (state: RootState) => state.freeBoard
    );

    useEffect(() => {
        dispatch(getFreeBoardByIdRequest(id));
    }, []);

    return (
        <Container color={theme.white}>
            <FreeBoardEditForm freeBoardById={freeBoardById} />
        </Container>
    );
};

export default index;
