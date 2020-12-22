import { useFormInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FreeBoardWrite from "../../../../components/board/freeboard/write/FreeBoardWrite";
import { Seo } from "../../../../head/Seo";
import { RootState } from "../../../../redux";
import { freeBoardWriteSubmit } from "../../../../redux/freeBoard";
import { loadRequest } from "../../../../redux/loading";
import { writeTitle } from "../../../../redux/write";
import { Container } from "../../../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [write, onWrite] = useFormInput();
    const { title, content } = useSelector((state: RootState) => state.write);
    const { user } = useSelector((state: RootState) => state.auth);
    const { freeBoardRouter, isSubmit } = useSelector(
        (state: RootState) => state.freeBoard
    );

    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            if (title === "" && content === "") {
                return alert("제목과 글을 입력해주세요");
            }
            dispatch(loadRequest());
            dispatch(
                freeBoardWriteSubmit({
                    title,
                    content,
                    regDate: new Date().toLocaleDateString(),
                    id: user.id ? user.id : "",
                    nickname: user.nickname ? user.nickname : "",
                })
            );
        },
        [title, content, dispatch, router, freeBoardRouter]
    );

    useEffect(() => {
        if (isSubmit) {
            router.push(`/board/freeboard/detail/${freeBoardRouter}`);
        }
    }, [isSubmit]);

    const data = {
        title: `자유게시판 글 작성`,
        description: "글을 써서 다른 사람과 이야기 해보세요!, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            <FreeBoardWrite onSubmit={onSubmit} onWrite={onWrite} />
        </Container>
    );
};

export default index;
