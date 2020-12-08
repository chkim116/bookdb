import React from "react";
import styled from "@emotion/styled";
import { Button } from "../../styles/CommonStyle";
import theme from "../../styles/theme";
import Link from "next/link";

const PostBtn = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    max-width: ${(props) => props.theme.maxWidth};
    button {
        width: 80px;
        margin: 0 12px;
    }
`;

type Review = {
    review?: boolean;
};

const PostButton = ({ review }: Review) => {
    return (
        <PostBtn>
            <Link
                href={
                    review ? "/board/review/write" : "/board/freeboard/write"
                }>
                <Button
                    bg={review ? theme.yellow : theme.blue}
                    color={review ? theme.black : theme.white}
                    hover={review && true}
                    radius={true}>
                    글쓰기
                </Button>
            </Link>
        </PostBtn>
    );
};

export default PostButton;
