import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../styles/CommonStyle";
import theme from "../styles/theme";
import { onGoBack } from "../hooks";
import { useRouter } from "next/dist/client/router";

const Container = styled.div`
    width: 100%;
`;

const WriteContainer = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    padding: 12px;
`;

const WriteForm = styled.form`
    display: flex;
    border: 1px solid ${(props) => props.theme.gray};
    padding: 12px;
    flex-direction: column;
`;

type Props = {
    review?: boolean;
};

const ReviewForm = ({ review }: Props) => {
    const router = useRouter();
    const onGoBack = () => {
        router.back();
    };
    return (
        <Container>
            <WriteContainer>
                <WriteForm>
                    {review && <Input type="text" placeholder="검색" />}
                    <Input type="text" placeholder="제목" />
                    <Input type="file" accept="image/*" />
                    <textarea placeholder="제목" />
                    <div>
                        <Button
                            bg={theme.blue}
                            color={theme.white}
                            type="submit">
                            제출
                        </Button>
                        <Button type="button" onClick={onGoBack}>
                            뒤로가기
                        </Button>
                    </div>
                </WriteForm>
            </WriteContainer>
        </Container>
    );
};

export default ReviewForm;
