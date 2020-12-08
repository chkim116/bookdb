import React from "react";
import styled from "@emotion/styled";
import WriteForm from "../../../Common/WriteForm";

const Container = styled.div`
    width: 100%;
`;

const ReviewWrite = () => {
    return (
        <Container>
            <WriteForm review={true} />
        </Container>
    );
};

export default ReviewWrite;
