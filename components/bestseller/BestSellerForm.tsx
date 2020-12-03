import React from "react";
import Link from "next/link";
import { BestSeller, Paths } from "../../pages/bestseller/[id]";
import { Button } from "../../styles/CommonStyle";

import styled from "@emotion/styled";
import Loader from "../../styles/loader";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

const Container = styled.div`
    width: 100%;
    padding: 12px;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
`;

const FilterNav = styled.div<any>`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 12px 0;
    button {
        margin: 0 8px;
        background: ${(props) => props.theme.white};
        border: 1px solid ${(props) => props.theme.gray};

        ${(props) =>
            props.selected === "0" &&
            css`
                &:nth-of-type(1) {
                    pointer-events: none;
                    background: ${theme.blue};
                    color: ${theme.white};
                }
            `}

        ${(props) =>
            props.selected === "2" &&
            css`
                &:nth-of-type(2) {
                    pointer-events: none;
                    background: ${theme.blue};
                    color: ${theme.white};
                }
            `}
         
            ${(props) =>
            props.selected === "3" &&
            css`
                &:nth-of-type(3) {
                    pointer-events: none;
                    background: ${theme.blue};
                    color: ${theme.white};
                }
            `}
         

        &:hover {
            background: ${(props) => props.theme.blue};
            color: ${(props) => props.theme.white};
        }
    }
`;

const Ranking = styled.h1`
    width: 100%;
    font-weight: bold;
`;

const BestSellerContainer = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
`;

const RankingBooks = styled.div`
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

const BooksTitle = styled.h3`
    font-weight: bold;
    position: relative;
`;

const BooksImg = styled.div`
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
    title: string;
    loading: boolean;
    selected: string | string[];
    onClick: () => void;
};

const BestSellerForm = ({ list, title, loading, selected, onClick }: Props) => {
    return (
        <Container>
            {loading && <Loader></Loader>}
            <Title>
                <Ranking>{title}</Ranking>
                <small>출처:교보문고</small>
            </Title>
            <FilterNav selected={selected}>
                <Link href={`/bestseller/${Paths.WEEK}`}>
                    <Button onClick={onClick}>주간</Button>
                </Link>

                <Link href={`/bestseller/${Paths.MONTHLY}`}>
                    <Button onClick={onClick}>월간</Button>
                </Link>

                <Link href={`/bestseller/${Paths.YEARS}`}>
                    <Button onClick={onClick}>년간</Button>
                </Link>
            </FilterNav>
            <BestSellerContainer>
                {list.map((v: BestSeller) => (
                    <div key={v.id}>
                        <Rank>{v.id + 1}</Rank>
                        <RankingBooks>
                            <BooksTitle>{v.title}</BooksTitle>
                            <BooksImg>
                                <img src={v.imageUrl} alt={v.imageAlt} />
                            </BooksImg>
                            <Auth>{v.auth}</Auth>
                            <p>{v.summary}</p>
                            <Link href={v.url}>
                                <a target="blank">
                                    <Button hover={true}>더보기</Button>
                                </a>
                            </Link>
                        </RankingBooks>
                    </div>
                ))}
            </BestSellerContainer>
        </Container>
    );
};

export default BestSellerForm;
