import React from "react";
import styled from "@emotion/styled";
import { BoardCard, Interview, ReviewPost } from "../../@types/types";
import { Button, Title } from "../../styles/CommonStyle";
import theme from "../../styles/theme";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import BookSliders from "./BookSliders";
import InterviewForm from "./InterviewForm";
import BoardForm from "../Common/BoardCardForm";
import review from "../../sagas/review";

const Container = styled.div`
    padding: 12px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    position: relative;
`;

const Board = styled.article`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    div {
        height: 200px;
        p {
            margin-top: 12px;
        }
    }
`;

const BestContainer = styled.div`
    width: 100%;
    position: relative;
    border: 3px solid ${(props) => props.theme.border};
    padding: 12px;
    margin-bottom: 48px;
`;

const Prev = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 33;
    transform: translateY(-50%);
    cursor: pointer;
`;

const Next = styled.div`
    position: absolute;
    z-index: 33;
    right: 0;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
`;

const BestBooks = styled.div`
    display: flex;
    overflow: hidden;
`;

const More = styled(Title)`
    justify-content: space-between;
    display: flex;

    button {
        line-height: 0;
    }
`;

type Props = {
    interview: Interview[];
    list: BoardCard[];
    reviews: ReviewPost[];
    slide: number;
    onNextSlide: () => void;
    onPrevSlide: () => void;
};

const MainPage = ({
    interview,
    list,
    slide,
    onNextSlide,
    onPrevSlide,
    reviews,
}: Props) => {
    return (
        <Container>
            <Title align="left">최근 리뷰</Title>
            <BoardForm reviewPost={reviews} review={true} main={true} />
            <Title align="left">스테디셀러</Title>
            <BestContainer>
                <Prev onClick={onPrevSlide}>
                    <AiOutlineArrowLeft size={28} />
                </Prev>
                <BestBooks className="slider">
                    <BookSliders slide={slide} list={list} />
                </BestBooks>
                <Next onClick={onNextSlide}>
                    <AiOutlineArrowRight size={28} />
                </Next>
            </BestContainer>
            <More align="left">
                작가인터뷰
                <Button bg={theme.blue} color={theme.white}>
                    더 구경하기
                </Button>
            </More>
            <Board>
                <InterviewForm interview={interview}></InterviewForm>
            </Board>
        </Container>
    );
};

export default MainPage;
