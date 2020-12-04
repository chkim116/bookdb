import React from "react";
import styled from "@emotion/styled";
import faker from "faker/locale/ko";
import { Title } from "../../../styles/CommonStyle";
import BannerImg from "../../../Common/BannerImg";
import PostButton from "../../../Common/PostButton";
import { Board } from "../../../@types/typs";
import FreeBoardForm from "../../../Common/FreeBoardForm";

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
`;

const BoardContainer = styled.div`
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
    li {
        height: 45px;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li:nth-of-type(2) {
        flex: 2;
        margin: 0 10px;
    }

    li:nth-of-type(3) {
        margin: 0 10px;
    }
`;

const FreeBoard = () => {
    const createBoard = (): Board => {
        return {
            num: faker.random.number(),
            text: faker.lorem.sentences(),
            title: faker.lorem.word(),
            img: faker.image.image(),
            user: faker.name.findName(),
            createdDate: new Date().toLocaleDateString(),
        };
    };

    const boards: Board[] = new Array(10).fill(undefined).map(createBoard);

    return (
        <Container>
            <BannerImg src={faker.image.abstract(1200, 400)} />
            <Title>자유게시판</Title>
            <PostButton />
            <BoardContainer>
                <BoardHead>
                    <li>글번호</li>
                    <li>제목</li>
                    <li>작성자</li>
                    <li>작성일</li>
                </BoardHead>

                <FreeBoardForm boards={boards}></FreeBoardForm>
            </BoardContainer>
        </Container>
    );
};

export default FreeBoard;
