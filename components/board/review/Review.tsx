import React from "react";
import styled from "@emotion/styled";
import { onClick, ReviewPost } from "../../../@types/types";
import BoardForm from "../../Common/BoardCardForm";
import { Title } from "../../../styles/CommonStyle";
import faker from "faker";
import BannerImg from "../../Common/BannerImg";
import PostButton from "../../Common/PostButton";
import banner from "../../../images/banner.jpg";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    width: 100%;
`;

type Props = {
    reviewPost: ReviewPost[];
    onDelete: onClick;
    onEdit: onClick;
};

const Review = ({ reviewPost, onDelete, onEdit }: Props) => {
    return (
        <Container>
            <BannerImg src={banner} />
            <Title>작품 리뷰</Title>
            <PostButton review={true} />
            <BoardForm
                reviewPost={reviewPost}
                onDelete={onDelete}
                onEdit={onEdit}
                review={true}
            />
        </Container>
    );
};

export default Review;
