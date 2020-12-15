import React from "react";
import styled from "@emotion/styled";
import { Button } from "../../styles/CommonStyle";
import Link from "next/link";
import { Seo } from "../../head/Seo";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50000;
    background-color: #f8f8f8;

    & > div {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

const index = () => {
    const data = {
        title: `404 NotFound`,
    };

    return (
        <Container>
            <Seo data={data} />
            <div>
                <div>에러</div>
                <Link href="/">
                    <Button type="button">Home</Button>
                </Link>
            </div>
        </Container>
    );
};

export default index;
