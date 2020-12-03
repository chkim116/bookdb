import React from "react";
import styled from "@emotion/styled";
import { BoardCard } from "../../../@types/typs";
import BoardForm from "../../Common/BoardCardForm";
import { Title } from "../../../styles/CommonStyle";
import faker from "faker";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%;
`;
const BoardImg = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 12px;
`;

type Props = {
    board: BoardCard[];
};

const Review = ({ board }: Props) => {
    return (
        <Container>
            <BoardImg>
                <img src={faker.image.abstract(1200, 400)} />
            </BoardImg>
            <Title>작품 리뷰</Title>
            <BoardForm list={board} review={true} />
        </Container>
    );
};

export default Review;
