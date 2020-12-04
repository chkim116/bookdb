import React from "react";
import { BoardCard } from "../@types/typs";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "../styles/CommonStyle";
import theme from "../styles/theme";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 36px 0;
    margin: 0 auto;
`;

const BoardCardForm = styled.div<Components>`
    text-align: center;
    padding: 12px;
    border: 3px solid ${(props) => props.theme.border};
    background: ${(props) => props.theme.white};
    height: ${(props) => !props.review && "480px"};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
        width: fit-content;
        margin: 10px auto;
    }
`;

const Rank = styled.div`
    text-align: center;
    width: 30px;
    border-radius: 50%;
    background: ${(props) => props.theme.blue};
    height: 30px;
    margin: 8px 0;
    font-size: ${(props) => props.theme.ls};
    color: ${(props) => props.theme.white};
    margin: 8px auto;
`;

const BoardTitle = styled.h3`
    font-weight: bold;
    position: relative;
`;

const BoardImg = styled.div`
    width: 200px;
    height: 288px;
    margin: 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
`;

const Auth = styled.div`
    padding: 8px 0;
    font-weight: 700;
`;

type Components = {
    review?: boolean;
    sell?: boolean;
};

type Props = {
    list?: BoardCard[];
    review?: boolean;
    sell?: boolean;
};

const BoardForm = ({ list, review, sell }: Props) => {
    return (
        <Container>
            {list.map((v: BoardCard) => (
                <div key={v.id}>
                    {!review && <Rank>{v.id + 1}</Rank>}
                    <BoardCardForm review={review} sell={sell}>
                        <BoardTitle>{v.title}</BoardTitle>
                        <BoardImg>
                            <img src={v.imageUrl} alt={v.imageAlt} />
                        </BoardImg>
                        <Auth>{v.auth}</Auth>
                        <p>
                            {v.summary.split("").slice(0, 250).join("")}
                            ...
                        </p>
                        <Link href={v.url}>
                            <a target={!review && "blank"}>
                                <Button
                                    hover={!sell && true}
                                    bg={sell && theme.blue}
                                    color={sell && theme.white}>
                                    더보기
                                </Button>
                            </a>
                        </Link>
                    </BoardCardForm>
                </div>
            ))}
        </Container>
    );
};

export default BoardForm;
