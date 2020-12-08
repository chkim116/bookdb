import React from "react";
import styled from "@emotion/styled";
import Rating from "./Rating";
import { Title } from "../../styles/CommonStyle";
import { ReviewPost } from "../../@types/types";
import ReviewBookForm from "../board/review/detail/ReviewBook";

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.white};
    padding: 12px;
`;

const DetailTitle = styled(Title)`
    text-align: left;
    font-size: 32px;
    padding: 12px;
`;

const CreatorUser = styled.div`
    width: 100%;
    text-align: right;
    div {
        margin: 0 4px;
    }
`;

const RatingStar = styled.div`
    width: fit-content;
    margin-left: auto;
`;

const Content = styled.div`
    margin-top: 12px;
    border-top: 3px solid ${(props) => props.theme.border};
    padding: 12px;
    min-height: 500px;
    padding: 24px;
`;

type Props = {
    reviewById?: ReviewPost;
    review?: boolean;
};
const DetailForm = ({ reviewById, review }: Props) => {
    return (
        <Container>
            <DetailTitle>{reviewById.title}</DetailTitle>
            <CreatorUser>
                <div>{reviewById.userId}</div>
                <div>{reviewById.regDate}</div>
            </CreatorUser>
            {review && <ReviewBookForm reviewById={reviewById} />}
            <RatingStar>
                <Rating rating={reviewById.rating} />
            </RatingStar>
            <Content dangerouslySetInnerHTML={{ __html: reviewById.content }} />
        </Container>
    );
};

export default DetailForm;
