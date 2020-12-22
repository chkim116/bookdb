import React from "react";
import styled from "@emotion/styled";

const BoardImg = styled.div<Src>`
    width: 100%;
    text-align: center;
    min-height: 420px;
    padding-top: 12px;
    text-align: center;
    background: url(${(props) => props.src}) no-repeat center;
`;

export type Src = {
    src: string;
};

const BannerImg = ({ src }: Src) => {
    return <BoardImg src={src}></BoardImg>;
};

export default BannerImg;
