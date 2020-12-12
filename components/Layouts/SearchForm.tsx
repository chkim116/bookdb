import React, { ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import Link from "next/link";
import faker from "faker";
import { BookData, onChange, onClick, onSubmit } from "../../@types/types";
import theme from "../../styles/theme";

const MainSearch = styled.form`
    position: relative;
`;

export const SearchResults = styled.div`
    position: absolute;
    border-radius: 8px;
    display: flex;
    width: 180%;
    left: -40%;
    z-index: 50000;
    flex-direction: column;
    background: ${(props) => props.theme.white};
    max-height: 450px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
        height: 20px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.white};
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: ${(props) => props.theme.gray};
    }
`;

export const SearchBookList = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-bottom: 3px;
    &:hover {
        background: ${(props) => props.theme.border};
    }
    div {
        margin: 0 3px;
        &:nth-of-type(2) {
            flex: 2;
            border-right: 1px solid ${(props) => props.theme.gray};
        }
        &:nth-of-type(3) {
            flex: 1;
            padding-right: 3px;
        }
    }
`;

type Props = {
    searchText: string | number;
    results: BookData[];
    onChange: onChange;
    onSubmit: onSubmit;
    onClick: () => void;
};

const SearchForm = ({
    searchText,
    results,
    onChange,
    onSubmit,
    onClick,
}: Props) => {
    return (
        <MainSearch onSubmit={onSubmit}>
            <Input
                onChange={onChange}
                type="text"
                width="250px"
                value={searchText}
                placeholder="제목으로 책 검색하기"
            />

            <Button onSubmit={onSubmit} width="30px" type="submit">
                검색
            </Button>
            {results[0]?.title && (
                <Button
                    onClick={onClick}
                    type="button"
                    width="30px"
                    bg={theme.blue}
                    color={theme.white}>
                    닫기
                </Button>
            )}

            <SearchResults>
                {results[0]?.title ? (
                    results.map((r, index) => (
                        <>
                            <Link
                                href={`/search?query=${r.title.replace(
                                    /<[^>]*>?/gm,
                                    ""
                                )}`}>
                                <SearchBookList key={index}>
                                    <div>
                                        <img
                                            src={
                                                r.image
                                                    ? r.image
                                                    : faker.image.abstract(
                                                          82,
                                                          120
                                                      )
                                            }
                                        />
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: r.title,
                                        }}></div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: r.author,
                                        }}></div>
                                </SearchBookList>
                            </Link>
                        </>
                    ))
                ) : (
                    <> </>
                )}
            </SearchResults>
        </MainSearch>
    );
};

export default SearchForm;
