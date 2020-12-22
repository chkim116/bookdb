import { useFormInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FreeBoardEditForm from "../../../../components/board/freeboard/edit/FreeBoardEditForm";
import { Seo } from "../../../../head/Seo";
import { RootState } from "../../../../redux";
import {
    freeBoardWriteUpdate,
    getFreeBoardByIdRequest,
} from "../../../../redux/freeBoard";
import { loadRequest } from "../../../../redux/loading";
import { writeTitle } from "../../../../redux/write";
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
    const [write, onWrite] = useFormInput();
    const { title, content } = useSelector((state: RootState) => state.write);

    // 기존 게시글 불러오기

    useEffect(() => {
        dispatch(getFreeBoardByIdRequest(id));
    }, []);

    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(
                freeBoardWriteUpdate({
                    title: title ? title : freeBoardById.title,
                    content: content ? content : freeBoardById.content,
                    id,
                })
            );
            router.push(`/board/freeboard/detail/${freeBoardById._id}`);
        },
        [title, content, dispatch, router, id, freeBoardById]
    );

    const data = {
        title: `${freeBoardById.title} 수정`,
        description: "자유게시글 수정 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container color={theme.white}>
            <Seo data={data} />
            <FreeBoardEditForm
                freeBoardById={freeBoardById}
                onWrite={onWrite}
                onSubmit={onSubmit}
            />
        </Container>
    );
};

export default index;
