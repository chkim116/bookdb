import React from "react";
import styled from "@emotion/styled";
import { ReviewPost } from "../../../../@types/types";
import Rating from "../../../Common/Rating";

type Props = {
    reviewById: ReviewPost;
};

const ReviewDetail = ({ reviewById }: Props) => {
    return (
        <div>
            <div>{reviewById.title}</div>
            <div dangerouslySetInnerHTML={{ __html: reviewById.content }} />
            <div>{reviewById.regDate}</div>
            <Rating rating={reviewById.rating} />
            <div>{reviewById.userId}</div>
            <div>
                <div>{reviewById.selectedBook.title}</div>
                <div>{reviewById.selectedBook.author}</div>
                <div>
                    <img
                        src={reviewById.selectedBook.image}
                        alt="리뷰 책 사진"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;
