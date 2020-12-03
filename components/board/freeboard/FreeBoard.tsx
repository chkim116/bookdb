import React from "react";
import styled from "@emotion/styled";
import faker from "faker/locale/ko";
import Link from "next/link";

const Board = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    border: 1px solid ${(props) => props.theme.border};
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 48px 0;
`;

const BoardImg = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 12px;
`;

const Title = styled.h2`
    text-align: center;
    height: 70px;
    padding: 34px 0;
    color: ${(props) => props.theme.black};
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

const BoardInfo = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: ${(props) => props.theme.white};
    align-items: center;
    text-align: center;
    padding: 0 12px;
    height: 136px;
    border-bottom: 3px solid ${(props) => props.theme.border};
    font-size: ${(props) => props.theme.ms};
    div:nth-of-type(3) {
        margin: 0 10px;
        width: 120px;
    }
    div:nth-of-type(4) {
        width: 120px;
    }
`;

const BoardDetail = styled.div`
    display: flex;
    flex: 2;
    justify-content: space-between;
    align-items: center;
    margin: 8px 30px;
    width: 100%;
    cursor: pointer;

    div:nth-of-type(2) {
        flex: 2;
    }
    h3,
    p {
        margin-left: 10px;
        text-align: left;
    }
`;

const BoardThmb = styled.div`
    width: 140px;
    height: 100%;
    img {
        width: 140px;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }
`;

const BoardNum = styled.div`
    width: 100px;
`;

type Board = {
    num: number;
    title: string;
    text: string;
    img: string;
    user: string;
    createdDate: string;
};

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
        <>
            <BoardImg>
                <img src={faker.image.abstract(1200, 400)} />
            </BoardImg>
            <Title>자유게시판</Title>
            <Board>
                <BoardHead>
                    <li>글번호</li>
                    <li>제목</li>
                    <li>작성자</li>
                    <li>작성일</li>
                </BoardHead>

                {boards.map((b) => (
                    <BoardInfo>
                        <BoardNum>{b.num}</BoardNum>
                        <Link href={`/board/freeboard/detail/${b.num}`}>
                            <BoardDetail>
                                <BoardThmb>
                                    <img
                                        src={b.img}
                                        alt="게시글 썸네일 이미지"
                                    />
                                </BoardThmb>
                                <div>
                                    <h3>{b.title}</h3>
                                    <p>{b.text}</p>
                                </div>
                            </BoardDetail>
                        </Link>
                        <div>{b.user}</div>
                        <div>{b.createdDate}</div>
                    </BoardInfo>
                ))}
            </Board>
        </>
    );
};

export default FreeBoard;
