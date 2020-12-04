import React from "react";
import { Button } from "../../styles/CommonStyle";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { BoardCard, Paths } from "../../@types/typs";
import BoardForm from "../../Common/BoardCardForm";

const Container = styled.div`
    width: 100%;
    padding: 12px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
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

type Props = {
    list: BoardCard[];
    title: string;
    selected: string | string[];
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const BestSellerForm = ({ list, title, selected, onClick }: Props) => {
    return (
        <Container>
            <Title>
                <Ranking>{title}</Ranking>
                <small>출처:교보문고</small>
            </Title>
            <FilterNav selected={selected}>
                <Button onClick={onClick} value={Paths.WEEK}>
                    주간
                </Button>

                <Button onClick={onClick} value={Paths.MONTHLY}>
                    월간
                </Button>

                <Button onClick={onClick} value={Paths.YEARS}>
                    년간
                </Button>
            </FilterNav>
            <BoardForm list={list} />
        </Container>
    );
};

export default BestSellerForm;
