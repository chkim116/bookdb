import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { FreeBoard } from "../../../@types/types";
import EditBoxForm from "../../Common/EditBox";

const BoardInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${(props) => props.theme.white};
    align-items: center;
    text-align: center;
    padding: 12px;
    height: 136px;
    font-size: ${(props) => props.theme.ms};
    border-bottom: 3px solid ${(props) => props.theme.border};
`;

const BoardDetail = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    width: 70%;
`;

const BoardDetailContent = styled.div`
    max-width: 750px;
    text-align: left;
    margin-left: 8px;
    h3,
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const BoardUser = styled.div`
    display: flex;
    align-items: center;
    & > div {
        margin: 0 8px;
    }

    div:nth-of-type(2) {
        text-align: center;
    }
`;

const BoardThmb = styled.div`
    width: 140px;
    height: 100%;
    img {
        width: 140px;
        height: 95%;
        padding-top: 5%;
        object-fit: cover;
        border-radius: 12px;
    }
`;

const BoardNum = styled.div`
    width: 10%;
`;

type Props = {
    freeBoards?: FreeBoard[];
};
const FreeBoardForm = ({ freeBoards }: Props) => {
    return (
        <>
            {freeBoards.map((b) => (
                <BoardInfo key={b._id}>
                    <BoardNum>{b.num}</BoardNum>
                    <Link href={`/board/freeboard/detail/${b._id}`}>
                        <BoardDetail>
                            {b.thumb !== "" ? (
                                <BoardThmb>
                                    <img
                                        src={b.thumb}
                                        alt="게시글 썸네일 이미지"
                                    />
                                </BoardThmb>
                            ) : (
                                <> </>
                            )}
                            <BoardDetailContent>
                                <h3>{b.title}</h3>
                                <p>
                                    {b.content
                                        .replace(/<[^>]*>?/gm, "")
                                        .slice(0, 200)}
                                </p>
                            </BoardDetailContent>
                        </BoardDetail>
                    </Link>
                    <BoardUser>
                        <div>{b.userId}</div>
                        <div>
                            <div>{b.regDate}</div>
                            <EditBoxForm id={b._id} />
                        </div>
                    </BoardUser>
                </BoardInfo>
            ))}
        </>
    );
};

export default FreeBoardForm;
