import React from "react";
import styled from "@emotion/styled";
import faker from "faker/locale/ko";
import { Title } from "../../../styles/CommonStyle";
import BannerImg from "../../Common/BannerImg";
import PostButton from "../../Common/PostButton";
import { FreeBoard, onClick } from "../../../@types/types";
import FreeBoardForm from "./FreeBoardForm";

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
`;

const BoardContainer = styled.article`
    margin: 0 auto;
    border: 1px solid ${(props) => props.theme.border};
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 48px 0;
`;

const BoardHead = styled.ul`
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    padding: 0 12px;
    height: 38px;
    line-height: 38px;
`;

type Props = {
    freeBoards: FreeBoard[];
    onDelete: onClick;
    onEdit: onClick;
};

const freeBoard = ({ freeBoards, onDelete, onEdit }: Props) => {
    return (
        <Container>
            <BannerImg src={faker.image.abstract(1200, 400)} />
            <Title>자유게시판</Title>
            <PostButton />
            <BoardContainer>
                <BoardHead>
                    <li>
                        자유게시판은 로그인하지 않아도 마음껏 등록이 가능합니다!
                    </li>
                </BoardHead>

                <FreeBoardForm
                    freeBoards={freeBoards}
                    onDelete={onDelete}
                    onEdit={onEdit}></FreeBoardForm>
            </BoardContainer>
        </Container>
    );
};

export default freeBoard;
