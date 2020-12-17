import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import Link from "next/link";
import { BookData, onChange, onSubmit } from "../../@types/types";
import theme from "../../styles/theme";
import book from "../../images/book.jpg";

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
    overflow-x: hidden;
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

const More = styled.div`
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 12px 0;
    border: 1px solid ${(props) => props.theme.border};
    &:hover {
        background: ${(props) => props.theme.darkWhite};
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
    isSearch: boolean;
    results: BookData[];
    onChange: onChange;
    onSubmit: onSubmit;
    onClick: () => void;
    onMore: () => void;
};

const SearchForm = ({
    searchText,
    results,
    onChange,
    onSubmit,
    onClick,
    onMore,
    isSearch,
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
            {isSearch && searchText !== "" && (
                <>
                    <Button
                        onClick={onClick}
                        type="button"
                        width="30px"
                        bg={theme.blue}
                        color={theme.white}>
                        닫기
                    </Button>
                </>
            )}

            <SearchResults>
                {results[0]?.title ? (
                    <>
                        {results.map((r, index) => (
                            <>
                                <Link
                                    href={`/search?query=${r.title.replace(
                                        /<[^>]*>?/gm,
                                        ""
                                    )}`}>
                                    <a key={index}>
                                        <SearchBookList>
                                            <div>
                                                <img
                                                    src={
                                                        r.image ? r.image : book
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
                                    </a>
                                </Link>
                            </>
                        ))}
                        <More onClick={onMore}>더보기</More>
                    </>
                ) : (
                    <> </>
                )}
            </SearchResults>
        </MainSearch>
    );
};

export default SearchForm;
