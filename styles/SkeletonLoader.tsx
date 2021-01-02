import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "@emotion/styled";

const Container = styled.div`
    max-width: ${({ theme }) => theme.maxWidth};
    width: 100%;
    height: 100vh;
    overflow: hidden;
    line-height: 30px;
    margin: 36px auto;
`;

const SkeletonLoader = () => {
    return (
        <Container>
            <Skeleton height={10} count={10} />
        </Container>
    );
};

export default SkeletonLoader;
