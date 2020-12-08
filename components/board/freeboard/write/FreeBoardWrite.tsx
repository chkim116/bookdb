import React from "react";
import WriteForm from "../../../Common/WriteForm";
import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
`;

const FreeBoardWrite = () => {
    return (
        <Container>
            <WriteForm></WriteForm>
        </Container>
    );
};

export default FreeBoardWrite;
