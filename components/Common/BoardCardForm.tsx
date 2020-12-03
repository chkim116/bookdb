import React from "react";
import { BestSeller } from "../../pages/bestseller/[id]";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "../../styles/CommonStyle";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
`;

const BoardCard = styled.div`
    text-align: center;
    padding: 12px;
    border: 3px solid ${(props) => props.theme.border};
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

type Props = {
    list: BestSeller[];
};

const BoardForm = ({ list }: Props) => {
    return (
        <Container>
            {list.map((v: BestSeller) => (
                <div key={v.id}>
                    <Rank>{v.id + 1}</Rank>
                    <BoardCard>
                        <BoardTitle>{v.title}</BoardTitle>
                        <BoardImg>
                            <img src={v.imageUrl} alt={v.imageAlt} />
                        </BoardImg>
                        <Auth>{v.auth}</Auth>
                        <p>{v.summary}</p>
                        <Link href={v.url}>
                            <a target="blank">
                                <Button hover={true}>더보기</Button>
                            </a>
                        </Link>
                    </BoardCard>
                </div>
            ))}
        </Container>
    );
};

export default BoardForm;
