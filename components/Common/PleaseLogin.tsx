import React from "react";
import { Container } from "../../styles/CommonStyle";
import styled from "@emotion/styled";

const Message = styled.h1`
    min-height: 70vh;
    line-height: 70vh;
    width: 100%;
    text-align: center;
`;

const PleaseLogin = () => {
    return (
        <Container>
            <Message>로그인 해주세요</Message>
        </Container>
    );
};

export default PleaseLogin;
