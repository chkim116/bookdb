import React from "react";
import styled from "@emotion/styled";
import Rating from "./Rating";
import { Title } from "../../styles/CommonStyle";
import { ReviewPost } from "../../@types/types";
import ReviewBookForm from "../board/review/detail/ReviewBook";
import EditBoxForm from "./EditBox";
import { FreeBoard } from "../../redux/freeBoard";

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    background-color: ${(props) => props.theme.white};
    padding: 12px 6px;
    margin: 30px auto;
`;

const DetailTitle = styled(Title)`
    text-align: left;
    font-size: 32px;
    padding: 12px 6px;
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
    padding: 24px 6px;
    min-height: 500px;

    img {
        width: 100%;
    }
`;

const Edit = styled.div`
    width: 100px;
    margin-left: auto;
`;

type Props = {
    reviewById?: ReviewPost;
    review: boolean;
    freeBoardById?: FreeBoard;
};
const DetailForm = ({ reviewById, freeBoardById, review }: Props) => {
    return (
        <Container>
            {review ? (
                <>
                    <DetailTitle>{reviewById.title}</DetailTitle>
                    <CreatorUser>
                        <div>{reviewById.userId}</div>
                        <div>{reviewById.regDate}</div>
                    </CreatorUser>
                    <ReviewBookForm reviewById={reviewById} />
                    <Edit>
                        <EditBoxForm id={reviewById._id} review={review} />
                    </Edit>
                    <RatingStar>
                        <Rating rating={reviewById.rating} />
                    </RatingStar>
                    <Content
                        dangerouslySetInnerHTML={{ __html: reviewById.content }}
                    />
                </>
            ) : (
                <>
                    <DetailTitle>{freeBoardById.title}</DetailTitle>
                    <CreatorUser>
                        <div>{freeBoardById.userId}</div>
                        <div>{freeBoardById.regDate}</div>
                    </CreatorUser>
                    <Edit>
                        <EditBoxForm id={freeBoardById._id} review={review} />
                    </Edit>

                    <Content
                        dangerouslySetInnerHTML={{
                            __html: freeBoardById.content,
                        }}
                    />
                </>
            )}
        </Container>
    );
};

export default DetailForm;
