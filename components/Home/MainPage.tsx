import React from "react";
import styled from "@emotion/styled";
import { BoardCard, Interview } from "../../@types/typs";
import FreeBoardForm from "../../Common/FreeBoardForm";
import { Button, Title } from "../../styles/CommonStyle";
import Link from "next/link";
import theme from "../../styles/theme";

const Container = styled.div`
    padding: 12px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    position: relative;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    div {
        height: 200px;
        p {
            margin-top: 12px;
        }
    }
`;

const BestContainer = styled.div`
    width: 100%;
    position: relative;
    border: 3px solid ${(props) => props.theme.border};
    padding: 12px;
    margin-bottom: 48px;
`;

const Prev = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 33;
    transform: translateY(-50%);
    cursor: pointer;
`;

const Next = styled.div`
    position: absolute;
    z-index: 33;
    right: 0;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
`;

const BestBooks = styled.div`
    display: flex;
    overflow: hidden;
`;

const Books = styled.div`
    position: relative;
    padding: 12px;
    text-align: center;
    left: 0;

    div {
        margin: 8px 0;
    }
`;

const BooksImg = styled.div`
    height: 250px;
    img {
        height: 100%;
    }
`;

const More = styled(Title)`
    justify-content: space-between;
    display: flex;
`;

type Props = {
    interview: Interview[];
    list: BoardCard[];
};

const MainPage = ({ interview, list }: Props) => {
    return (
        <Container>
            <Title align="left">스테디셀러</Title>
            <BestContainer>
                <Prev>이전</Prev>
                <BestBooks>
                    {list.map((v) => (
                        <Books key={v.id}>
                            <BooksImg>
                                <img src={v.imageUrl} alt={v.imageAlt} />
                            </BooksImg>
                            <div>{v.auth}</div>
                            <Link href={v.url}>
                                <a target="blank">
                                    <Button hover={true}>구매하기</Button>
                                </a>
                            </Link>
                        </Books>
                    ))}
                </BestBooks>
                <Next>다음</Next>
            </BestContainer>

            <More align="left">
                작가인터뷰
                <Button bg={theme.blue} color={theme.white}>
                    더 구경하기
                </Button>
            </More>
            <Board>
                <FreeBoardForm interview={interview}></FreeBoardForm>
            </Board>
        </Container>
    );
};

export default MainPage;
