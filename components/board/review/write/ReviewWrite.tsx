import React from "react";
import styled from "@emotion/styled";
import ReviewForm from "../../../../Common/ReviewForm";

const Container = styled.div`
    width: 100%;
`;

const ReviewWrite = () => {
    return (
        <Container>
            <ReviewForm />
        </Container>
    );
};

export default ReviewWrite;
