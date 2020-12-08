import React, { useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import theme from "../../styles/theme";
import { useRouter } from "next/dist/client/router";
import { RichTextEditor } from "./RichTextEditor";
import { useInput, useFindId, useFormInput } from "@cooksmelon/event";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectBookFailure,
    getSelectBookRequest,
    reviewWriteSubmit,
    reviewWriteUpdate,
    selectBookRequest,
    writeTitle,
} from "../../redux/review";
import { SearchBookList, SearchResults } from "../Layouts/SearchForm";
import { BookData, ReviewPost } from "../../@types/types";
import { RootState } from "../../redux";
import faker from "faker";
import { loadRequest } from "../../redux/loading";
import Rating from "./Rating";

const Container = styled.div`
    width: 100%;
`;

const SelectedBook = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 12px;
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
    padding: 12px;
    flex-direction: column;
    align-items: center;

    input {
        margin: 10px 0;
        border: none;
        width: 100%;
        font-size: 24px;
    }
`;

const Title = styled(Input)`
    padding-left: 20px;
    border-bottom: 1px solid ${(props) => props.theme.gray};
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
`;

type Props = {
    review?: boolean;
    reviewById?: ReviewPost;
    update?: boolean;
};

const ReviewForm = ({ review, reviewById, update }: Props) => {
    const router = useRouter();
    const [searchText, onChange, setSearchText] = useInput("");
    const [write, onWrite] = useFormInput();
    const [findId, onFindId] = useFindId();
    const dispatch = useDispatch();

    const { title, content, selectedBook, rating } = useSelector(
        (state: RootState) => state.review
    );
    const results: BookData[] = useSelector(
        (state: RootState) => state.review.searchData
    );
    const selectBook = useSelector(
        (state: RootState) => state.review.selectedBook
    );

    // 폼 제출 시 (리뷰 글쓰기&자유게시판 글쓰기)
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            if (review) {
                update !== undefined
                    ? dispatch(
                          reviewWriteUpdate({
                              title: title ? title : reviewById.title,
                              content: content ? content : reviewById.content,
                              id: router.query.id,
                          })
                      )
                    : dispatch(
                          reviewWriteSubmit({
                              title,
                              content,
                              regDate: new Date().toLocaleString(),
                              rating,
                              selectedBook,
                          })
                      );
                router.push("/board/review");
            }
        },
        [title, content, dispatch, review, update]
    );

    // content 작성 로직은 RichTextEditor.tsx에 있습니다.
    useEffect(() => {
        dispatch(writeTitle(write));
    }, [write]);

    // 리뷰할 책 검색
    useEffect(() => {
        if (searchText !== "") {
            dispatch(getSelectBookRequest({ searchText }));
        } else {
            dispatch(getSelectBookFailure({ message: "입력 값이 없습니다." }));
        }
    }, [searchText, dispatch]);

    // 리뷰할 책 선택
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
    }, [findId, dispatch]);

    const onGoBack = () => {
        router.back();
    };
    return (
        <Container>
            <WriteContainer>
                <WriteForm onSubmit={onSubmit}>
                    {review && !update && (
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
                    {review && !update ? (
                        selectBook.title !== "" ? (
                            <>
                                <SelectedBook>
                                    <div>
                                        <img src={selectBook.image} />
                                    </div>
                                    <BookDesc>
                                        <div>{selectBook.title}</div>
                                        <div>{selectBook.author}</div>
                                    </BookDesc>
                                </SelectedBook>
                                <Rating rating="" />
                            </>
                        ) : (
                            <PleaseSelect>
                                리뷰하고자 하는 책을 검색해 선택해주세요.
                            </PleaseSelect>
                        )
                    ) : (
                        <> </>
                    )}
                    <Title
                        type="text"
                        onChange={onWrite}
                        name="title"
                        placeholder="제목"
                        defaultValue={update && reviewById.title}
                    />
                    {update && <RichTextEditor value={reviewById.content} />}
                    <WriteSubmit>
                        <Button
                            onSubmit={onSubmit}
                            bg={theme.blue}
                            color={theme.white}
                            type="submit">
                            {update ? "수정" : "제출"}
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
