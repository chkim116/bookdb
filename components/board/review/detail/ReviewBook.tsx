import React from "react";
import styled from "@emotion/styled";
import { ReviewPost } from "../../../../@types/types";

const ReviewBook = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        margin: 0 4px;
    }
`;

const ReviewBookTitle = styled.div`
    font-size: ${(props) => props.theme.ls};
`;
const ReviewBookAuthor = styled.div`
    font-weight: 700;
    text-align: right;
`;

type Props = {
    reviewById: ReviewPost;
};

const ReviewBookForm = ({ reviewById }: Props) => {
    return (
        <ReviewBook>
            <div>
                <img src={reviewById.selectedBook.image} alt="리뷰 책 사진" />
            </div>
            <div>
                <ReviewBookTitle>
                    {reviewById.selectedBook.title}
                </ReviewBookTitle>
                <ReviewBookAuthor>
                    {reviewById.selectedBook.author}
                </ReviewBookAuthor>
            </div>
        </ReviewBook>
    );
};

export default ReviewBookForm;
