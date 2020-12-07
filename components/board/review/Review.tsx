import React from "react";
import styled from "@emotion/styled";
import { BoardCard } from "../../../@types/types";
import BoardForm from "../../../Common/BoardCardForm";
import { Title } from "../../../styles/CommonStyle";
import faker from "faker";
import BannerImg from "../../../Common/BannerImg";
import PostButton from "../../../Common/PostButton";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%;
`;

type Props = {
    board: BoardCard[];
};

const Review = ({ board }: Props) => {
    return (
        <Container>
            <BannerImg src={faker.image.abstract(1200, 400)} />
            <Title>작품 리뷰</Title>
            <PostButton review={true} />
            <BoardForm list={board} review={true} />
        </Container>
    );
};

export default Review;
