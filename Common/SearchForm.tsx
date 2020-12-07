import React from "react";
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useRouter } from "next/dist/client/router";
import styled from "@emotion/styled";
import Axios from "axios";
import { Button, Input } from "../styles/CommonStyle";
import { BookData } from "../@types/types";
import { useDispatch, useSelector } from "react-redux";
import { getSearchRequest, SearchState } from "../redux/search";
import useSelection from "antd/lib/table/hooks/useSelection";
import { RootState } from "../redux";

const MainSearch = styled.form`
    position: relative;
`;

const SearchResults = styled.div`
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

const SearchBookList = styled.div`
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
    write?: boolean;
};

const SearchForm = ({ write }: Props) => {
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();
    const results: BookData[] = useSelector(
        (state: RootState) => state.search.searchData
    );
    console.log(results);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            setSearchText(value);
            dispatch(getSearchRequest({ searchText: value }));
        },
        [searchText]
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            router.push(`/search?query=${searchText}`);
            setSearchText("");
        },
        [searchText]
    );

    return (
        <MainSearch>
            <Input
                onChange={onChange}
                type="text"
                width="250px"
                value={searchText}
                placeholder="제목으로 책 검색하기"
            />
            {write || (
                <Button onSubmit={onSubmit} width="30px" type="submit">
                    검색
                </Button>
            )}
            <SearchResults>
                {results.length > 0 ? (
                    results.map((r, index) => (
                        <SearchBookList key={index}>
                            <div>
                                <img src={r.image} />
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
                    ))
                ) : (
                    <div> </div>
                )}
            </SearchResults>
        </MainSearch>
    );
};

export default SearchForm;
