import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Interview } from "../../@types/types";

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
    cursor: pointer;
    div:nth-of-type(2) {
        flex: 2;
        margin-top: 12px;
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

type Components = {
    hover?: boolean;
};

type Props = {
    interview?: Interview[];
};
const InterviewForm = ({ interview }: Props) => {
    return (
        <>
            {interview.map((v) => (
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
            ))}
        </>
    );
};

export default InterviewForm;
