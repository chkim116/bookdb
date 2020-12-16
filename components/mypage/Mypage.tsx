import React from "react";
import { User } from "../../@types/types";
import styled from "@emotion/styled";
import BoardForm from "../Common/BoardCardForm";
import { Button, Title } from "../../styles/CommonStyle";
import Link from "next/link";

const UserDetail = styled.div`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 3px solid ${(props) => props.theme.border};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div:nth-of-type(odd) {
        margin-top: 8px;
    }
`;

const Filter = styled.div`
    display: flex;
    justify-content: center;
    button {
        margin: 0 5px;
    }
`;

const Freeboards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    justify-content: center;
    margin: 0 auto;
    max-width: ${(props) => props.theme.maxWidth};
    padding-bottom: 24px;

    img {
        width: 100%;
    }
`;

const Board = styled.div`
    padding: 8px;
    box-shadow: ${(props) => props.theme.boxShadow};
    min-height: 300px;
    max-height: 300px;
    cursor: pointer;
    overflow: hidden;
`;

const BoardTitle = styled.div`
    font-size: ${(props) => props.theme.xls};
    padding-bottom: 8px;
    border-bottom: 1px solid ${(props) => props.theme.blue};
`;

const BoardContent = styled.div`
    padding: 8px;
`;

const BoardCount = styled.div`
    text-align: right;
    margin: 6px 0;
`;

type Props = {
    userPost: User;
    review: boolean;
    onToggle: () => void;
};

const Mypage = ({ userPost, review, onToggle }: Props) => {
    return (
        <div>
            <UserDetail>
                <div>
                    <strong>User Nickname</strong>
                </div>
                <div>{userPost.nickname}</div>
                <div>
                    <strong>User EMAIL</strong>
                </div>
                <div>{userPost.email}</div>
            </UserDetail>
            <Filter>
                <Button type="button" onClick={onToggle}>
                    {!review ? "리뷰보기" : "자유게시글보기"}
                </Button>
            </Filter>
            {review ? (
                <>
                    <Title>리뷰글</Title>
                    <BoardForm
                        reviewPost={userPost.review}
                        review={true}></BoardForm>
                </>
            ) : (
                <>
                    <Title>자유게시판 글</Title>
                    <Freeboards>
                        {userPost.board.map((b) => (
                            <Link
                                key={b._id}
                                href={`/board/freeboard/detail/${b._id}`}>
                                <Board>
                                    <BoardTitle>{b.title}</BoardTitle>
                                    <BoardCount>조회수: {b.count}</BoardCount>
                                    <BoardContent
                                        dangerouslySetInnerHTML={{
                                            __html: b.content,
                                        }}></BoardContent>
                                </Board>
                            </Link>
                        ))}
                    </Freeboards>
                </>
            )}
        </div>
    );
};

export default Mypage;
