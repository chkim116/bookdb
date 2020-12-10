import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Interview } from "../../@types/types";
import { FreeBoard } from "../../redux/freeBoard";
import EditBoxForm from "./EditBox";

const BoardInfo = styled.div<Components>`
    display: flex;
    justify-content: space-around;
    background-color: ${(props) => props.theme.white};
    align-items: center;
    text-align: center;
    padding: 12px;
    height: 136px;
    font-size: ${(props) => props.theme.ms};
    border-bottom: 3px solid ${(props) => props.theme.border};
    div:nth-of-type(3) {
        margin: 0 10px;
        width: 120px;
    }
    div:nth-of-type(4) {
        width: 120px;
    }

    &:hover {
        box-shadow: ${(props) => props.hover && props.theme.boxShadow};
        transition: ${(props) => props.hover && "all 500ms"};
        border-radius: ${(props) => props.hover && "8px"};
    }
`;

const BoardDetail = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    div:nth-of-type(2) {
        margin-top: 12px;
    }
    h3,
    p {
        margin-left: 10px;
        text-align: left;
    }
`;

const BoardDetailContent = styled.div`
    max-width: 640px;
    h3,
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    width: 100px;
`;

type Components = {
    hover?: boolean;
};

type Props = {
    interview?: Interview[];
    freeBoards?: FreeBoard[];
};
const FreeBoardForm = ({ freeBoards, interview }: Props) => {
    return (
        <>
            {interview
                ? interview.map((v) => (
                      <BoardInfo key={v.id} hover={true}>
                          <Link
                              href={`http://news.kyobobook.co.kr/people/interviewView.ink?orderclick=&sntn_id=${v.url}`}>
                              <a target="blank">
                                  <BoardDetail>
                                      <BoardThmb>
                                          <img
                                              src={v.imageUrl}
                                              alt="게시글 썸네일 이미지"
                                          />
                                      </BoardThmb>
                                      <div>
                                          <h3>{v.title}</h3>
                                          <p>{v.detail.slice(0, 200)}...</p>
                                      </div>
                                  </BoardDetail>
                              </a>
                          </Link>
                      </BoardInfo>
                  ))
                : freeBoards.map((b) => (
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
                          <div>{b.userId}</div>
                          <div>
                              <div>{b.regDate}</div>
                              <EditBoxForm id={b._id} />
                          </div>
                      </BoardInfo>
                  ))}
        </>
    );
};

export default FreeBoardForm;
