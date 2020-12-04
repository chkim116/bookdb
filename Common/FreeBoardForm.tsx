import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Board, Interview } from "../@types/typs";

const BoardInfo = styled.div<BoardHover>`
    display: flex;
    justify-content: space-around;
    background-color: ${(props) => props.theme.white};
    align-items: center;
    text-align: center;
    padding: 0px 12px;
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
        box-shadow: 3px 2px 6px 2px ${(props) => props.theme.shadow};
        transition: all 500ms;
        border-radius: 8px;
    }
`;

const BoardDetail = styled.div`
    display: flex;
    flex: 2;
    justify-content: space-between;
    align-items: center;
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
        height: 95%;
        padding-top: 5%;
        object-fit: cover;
        border-radius: 12px;
    }
`;

const BoardNum = styled.div`
    width: 100px;
`;

type BoardHover = {
    hover?: boolean;
};

type Props = {
    boards?: Board[];
    interview?: Interview[];
};

const FreeBoardForm = ({ boards, interview }: Props) => {
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
                : boards.map((b) => (
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
        </>
    );
};

export default FreeBoardForm;
