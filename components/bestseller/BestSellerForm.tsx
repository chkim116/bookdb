import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BestSeller, Paths } from "../../pages/bestseller/[id]";
import { Button } from "../../styles/CommonStyle";

import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import Loader from "../../styles/loader";

const Container = styled.div`
    width: 100%;
    padding: 12px;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
`;

const FilterNav = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 12px 0;
    button {
        margin: 0 8px;
        background: ${(props) => props.theme.white};
        border: 1px solid ${(props) => props.theme.gray};

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
    height: 462px;
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

const checkRouter = (id: string | string[]): string => {
    if (id === Paths.WEEK) {
        return "주간 베스트셀러 TOP20";
    }
    if (id === Paths.MONTHLY) {
        return "월간 베스트셀러 TOP20";
    }
    if (id === Paths.YEARS) {
        return "년간 베스트셀러 TOP20";
    }
};

const BestSellerForm = ({ list }: any) => {
    const {
        query: { id },
    } = useRouter();

    const title = checkRouter(id);

    const [loading, setLoading] = useState<boolean>(false);

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
    };

    useEffect(() => {
        setLoading(false);
    }, [id]);

    return (
        <Container>
            {loading && <Loader></Loader>}
            <Title>
                <Ranking>{title}</Ranking>
                <small>출처:교보문고</small>
            </Title>
            <FilterNav>
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
