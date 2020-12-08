import React from "react";
import styled from "@emotion/styled";

const BoardImg = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 12px;
`;

export type Src = {
    src: string;
};

const BannerImg = ({ src }: Src) => {
    return (
        <BoardImg>
            <img src={src} />
        </BoardImg>
    );
};

export default BannerImg;
