import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Interview } from "../../@types/types";
import { FreeBoard } from "../../redux/freeBoard";
import faker from "faker";

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
    flex: 2;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    div:nth-of-type(2) {
        margin-top: 12px;
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
                                  <BoardThmb>
                                      <img
                                          src={
                                              b.thumb
                                                  ? b.thumb
                                                  : faker.image.imageUrl()
                                          }
                                          alt="게시글 썸네일 이미지"
                                      />
                                  </BoardThmb>
                                  <div>
                                      <h3>{b.title}</h3>
                                      <p>
                                          {b.content
                                              .replace(/<[^>]*>?/gm, "")
                                              .slice(0, 200)}
                                      </p>
                                  </div>
                              </BoardDetail>
                          </Link>
                          <div>{b.userId}</div>
                          <div>{b.regDate}</div>
                      </BoardInfo>
                  ))}
        </>
    );
};

export default FreeBoardForm;
