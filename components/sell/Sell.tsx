import React from "react";
import styled from "@emotion/styled";
import BoardForm from "../../Common/BoardCardForm";
import { BoardCard } from "../../@types/typs";
import { Title } from "../../styles/CommonStyle";
import BannerImg from "../../Common/BannerImg";

import faker from "faker";
import PostButton from "../../Common/PostButton";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%;
`;

type Props = {
    board: BoardCard[];
};

const Sell = ({ board }: Props) => {
    return (
        <Container>
            <BannerImg src={faker.image.abstract(1200, 400)} />
            <Title>헌책 판매</Title>
            <PostButton />
            <BoardForm list={board} review={true} sell={true}></BoardForm>
        </Container>
    );
};

export default Sell;
