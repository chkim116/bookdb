import React, { ChangeEvent, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../styles/CommonStyle";
import theme from "../styles/theme";
import { useRouter } from "next/dist/client/router";
import { RichTextEditor } from "./RichTextEditor";
import { useInput, useFindId, useFormInput } from "@cooksmelon/event";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectBookFailure,
    getSelectBookRequest,
    selectBookRequest,
} from "../redux/review";
import {
    SearchBookList,
    SearchResults,
} from "../components/Layouts/SearchForm";
import { BookData } from "../@types/types";
import { RootState } from "../redux";
import faker from "faker";

const Container = styled.div`
    width: 100%;
`;

const SelectedBook = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    border: 3px solid ${(props) => props.theme.border};
    padding: 12px;
    margin-bottom: 10px;
`;

const PleaseSelect = styled.div`
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.gray};
    margin-bottom: 12px;
`;

const BookDesc = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const WriteContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 12px;
`;

const WriteForm = styled.form`
    background: ${(props) => props.theme.white};
    display: flex;
    border: 1px solid ${(props) => props.theme.gray};
    padding: 12px;
    flex-direction: column;
    align-items: center;

    input {
        margin: 5px 0;
        border: none;
        width: 100%;
        font-size: 28px;
        padding: 6px 0;
    }
`;

const WriteSubmit = styled.div`
    margin: 24px 0;
    display: flex;
    justify-content: center;

    button {
        margin: 0 6px;
    }
`;

const ResultForm = styled.div`
    position: relative;
    text-align: center;
    input {
        font-size: ${(props) => props.theme.xls};
        padding-left: 5px;
    }
`;

type Props = {
    review?: boolean;
};

const ReviewForm = ({ review }: Props) => {
    const router = useRouter();
    const [searchText, onChange, setSearchText] = useInput("");
    const [findId, onFindId] = useFindId();
    const dispatch = useDispatch();
    const results: BookData[] = useSelector(
        (state: RootState) => state.review.searchData
    );
    const selectBook = useSelector(
        (state: RootState) => state.review.selectedBook
    );

    useEffect(() => {
        if (searchText !== "") {
            dispatch(getSelectBookRequest({ searchText }));
        } else {
            dispatch(getSelectBookFailure({ message: "입력 값이 없습니다." }));
        }
    }, [searchText]);

    useEffect(() => {
        const find = findId.replace(/<[^>]*>?/gm, "").split("&&");
        const selectedBook = {
            title: find[0],
            author: find[1],
            image: find[2],
            isbn: find[3],
        };
        dispatch(selectBookRequest(selectedBook));
        setSearchText("");
    }, [findId]);

    const onGoBack = () => {
        router.back();
    };
    return (
        <Container>
            <WriteContainer>
                <WriteForm>
                    {review && (
                        <ResultForm>
                            <Input
                                onChange={onChange}
                                type="text"
                                width="250px"
                                value={searchText}
                                placeholder="제목으로 책 검색하기"
                            />
                            <SearchResults>
                                {results.length > 0 &&
                                results[0].title !== "" ? (
                                    results.map((r) => (
                                        <SearchBookList
                                            onClick={onFindId}
                                            data-id={`${r.title}&&${r.author}&&${r.image}&&${r.isbn}`}
                                            key={faker.random.uuid()}>
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
                                    ))
                                ) : (
                                    <div> </div>
                                )}
                            </SearchResults>
                        </ResultForm>
                    )}
                    {review ? (
                        selectBook.title !== "" ? (
                            <SelectedBook>
                                <div>
                                    <img src={selectBook.image} />
                                </div>
                                <BookDesc>
                                    <div>{selectBook.title}</div>
                                    <div>{selectBook.author}</div>
                                </BookDesc>
                            </SelectedBook>
                        ) : (
                            <PleaseSelect>
                                리뷰하고자 하는 책을 검색해 선택해주세요.
                            </PleaseSelect>
                        )
                    ) : (
                        <> </>
                    )}
                    <Input type="text" name="title" placeholder="제목" />
                    <RichTextEditor />
                    <WriteSubmit>
                        <Button
                            bg={theme.blue}
                            color={theme.white}
                            type="submit">
                            제출
                        </Button>
                        <Button type="button" onClick={onGoBack}>
                            뒤로가기
                        </Button>
                    </WriteSubmit>
                </WriteForm>
            </WriteContainer>
        </Container>
    );
};

export default ReviewForm;
