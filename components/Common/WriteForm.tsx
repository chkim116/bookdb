import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import theme from "../../styles/theme";
import { useRouter } from "next/dist/client/router";
import { RichTextEditor } from "./RichTextEditor";
import { SearchBookList, SearchResults } from "../Layouts/SearchForm";
import {
    BookData,
    FreeBoard,
    onChange,
    onClick,
    onFormChange,
    onSubmit,
    ReviewPost,
} from "../../@types/types";
import faker from "faker";
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
    padding: 12px 6px;
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
    padding: 12px 6px;
`;

const WriteForm = styled.form`
    background: ${(props) => props.theme.white};
    display: flex;
    padding: 12px 6px;
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

const ResultInput = styled.div`
    display: flex;
    align-items: center;
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

type Props = {
    review: boolean;
    update: boolean;
    reviewById?: ReviewPost;
    freeBoardById?: FreeBoard;
    selectBook?: BookData;
    results?: BookData[];
    onChange?: onFormChange;
    onFindId?: onClick;
    onWrite: onChange;
    onClick?: () => void;
    onMore: () => void;
    onSubmit: onSubmit;
    searchText?: string | number;
};

const WriteCommonForm = ({
    review,
    reviewById,
    update,
    freeBoardById,
    selectBook,
    results,
    onChange,
    onFindId,
    onWrite,
    onSubmit,
    searchText,
    onClick,
    onMore,
}: Props) => {
    const router = useRouter();

    const onGoBack = () => {
        router.back();
    };
    return (
        <Container>
            <WriteContainer>
                <WriteForm onSubmit={onSubmit}>
                    {review && !update && (
                        <ResultForm>
                            <ResultInput>
                                <Input
                                    autoComplete="off"
                                    onChange={onChange}
                                    type="text"
                                    width="250px"
                                    value={searchText}
                                    placeholder="제목으로 책 검색하기"
                                />
                                {results[0]?.title && (
                                    <Button
                                        onClick={onClick}
                                        width="50px"
                                        type="button">
                                        닫기
                                    </Button>
                                )}
                            </ResultInput>
                            <SearchResults>
                                {results[0]?.title ? (
                                    <>
                                        {results.map((r) => (
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
                                        ))}
                                        <More onClick={onMore}>더보기</More>
                                    </>
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
                    {review ? (
                        <Title
                            type="text"
                            onChange={onWrite}
                            autoComplete="off"
                            name="title"
                            placeholder="제목"
                            defaultValue={update ? reviewById.title : ""}
                            required
                        />
                    ) : (
                        <Title
                            type="text"
                            onChange={onWrite}
                            name="title"
                            autoComplete="off"
                            placeholder="제목"
                            defaultValue={update ? freeBoardById.title : ""}
                            required
                        />
                    )}
                    {review ? (
                        <RichTextEditor
                            value={update ? reviewById.content : ""}
                        />
                    ) : (
                        <RichTextEditor
                            value={update ? freeBoardById.content : ""}
                        />
                    )}
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

export default WriteCommonForm;
