import React from "react";
import styled from "@emotion/styled";

const Board = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
`;

const FreeBoard = () => {
    return <Board></Board>;
};

export default FreeBoard;
