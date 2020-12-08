import React from "react";
import ReviewWrite from "../../../../components/board/review/write/ReviewWrite";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    return (
        <Container color={theme.white}>
            <ReviewWrite />
        </Container>
    );
};

export default index;
