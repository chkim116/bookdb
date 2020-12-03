import React from "react";
import { BoardCard } from "../../../@types/typs";
import Review from "../../../components/board/review/Review";
import { Container } from "../../../styles/CommonStyle";
import faker from "faker";

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
            <Review board={board}></Review>
        </Container>
    );
};

export default index;
