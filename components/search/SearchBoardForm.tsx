import React from "react";
import { SearchResults } from "../../@types/types";

import styled from "@emotion/styled";
import { Title } from "../../styles/CommonStyle";

const ResultsContainer = styled.article`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
    background-color: ${(props) => props.theme.white};
    padding: 12px;
`;

const ResultsForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid ${(props) => props.theme.gray};
    cursor: pointer;

    & > div:nth-of-type(3) {
        font-size: ${(props) => props.theme.ms};
        div {
            margin: 4px 0;
        }
    }

    &:hover {
        .desc {
            text-decoration: underline;
        }
    }
`;

const Author = styled.div`
    font-size: ${(props) => props.theme.xls};
    display: flex;
    align-items: center;
    div:nth-of-type(1) {
        margin: 0 8px;
    }
    div:nth-of-type(2) {
        font-size: ${(props) => props.theme.ms};
    }
`;

const Desc = styled.div`
    padding: 8px 12px;
`;

const PubDate = styled.div`
    text-align: center;
`;

type Props = {
    results: SearchResults[];
    text: string;
};

const SearchBoardForm = ({ results, text }: Props) => {
    return (
        <ResultsContainer>
            <Title>{text} 검색 결과</Title>
            {results && results.length > 0 ? (
                results.map((r) => (
                    <ResultsForm>
                        <div>
                            <img src={r.image} />
                        </div>
                        <div>
                            <Author>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `${r.title.slice(0, 50)}${
                                            r.title.length > 50 ? "..." : ""
                                        }`,
                                    }}></div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: r.author,
                                    }}></div>
                            </Author>
                            <Desc
                                className="desc"
                                dangerouslySetInnerHTML={{
                                    __html: r.description,
                                }}></Desc>
                        </div>
                        <PubDate>
                            <div>{r.pubdate}</div>
                            <div>{r.publisher}</div>
                        </PubDate>
                    </ResultsForm>
                ))
            ) : (
                <div>검색 결과가 없습니다</div>
            )}
        </ResultsContainer>
    );
};

export default SearchBoardForm;
