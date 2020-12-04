import React from "react";
import { BoardCard } from "../../@types/typs";
import { Container } from "../../styles/CommonStyle";
import faker from "faker";
import Sell from "../../components/sell/Sell";

const index = () => {
    const createBoard = (): BoardCard => {
        return {
            summary: faker.lorem.sentences(),
            title: faker.lorem.word(),
            imageUrl: faker.image.image(),
            imageAlt: "image",
            auth: faker.name.findName(),
            url: `/board/review/detail/${faker.random.number()}`,
            id: faker.random.number(20),
        };
    };

    const board: BoardCard[] = new Array(10).fill(undefined).map(createBoard);

    return (
        <Container color="#f8f8f8">
            <Sell board={board}></Sell>
        </Container>
    );
};

export default index;
