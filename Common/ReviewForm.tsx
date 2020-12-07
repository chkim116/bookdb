import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../styles/CommonStyle";
import theme from "../styles/theme";
import { useRouter } from "next/dist/client/router";
import { RichTextEditor } from "./RichTextEditor";
import SearchForm from "./SearchForm";

const Container = styled.div`
    width: 100%;
`;

const WriteContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 12px;
`;

const WriteForm = styled.form`
    background: ${(props) => props.theme.white};
    display: flex;
    border: 1px solid ${(props) => props.theme.gray};
    padding: 12px;
    flex-direction: column;
    align-items: center;

    input {
        margin: 5px 0;
        border: none;
        width: 100%;
        font-size: ${(props) => props.theme.xls};
        padding: 6px 0;
        padding-left: 4px;
    }
`;

const WriteSubmit = styled.div`
    margin: 24px 0;
    display: flex;
    justify-content: center;

    button {
        margin: 0 6px;
    }
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
                    {review && <SearchForm write={true} />}
                    <Input type="text" placeholder="제목" />
                    <RichTextEditor />
                    <WriteSubmit>
                        <Button
                            bg={theme.blue}
                            color={theme.white}
                            type="submit">
                            제출
                        </Button>
                        <Button type="button" onClick={onGoBack}>
                            뒤로가기
                        </Button>
                    </WriteSubmit>
                </WriteForm>
            </WriteContainer>
        </Container>
    );
};

export default ReviewForm;
