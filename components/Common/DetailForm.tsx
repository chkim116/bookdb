import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Rating from "./Rating";
import { Button, Title } from "../../styles/CommonStyle";
import { FreeBoard, onClick, ReviewPost } from "../../@types/types";
import ReviewBookForm from "../board/review/detail/ReviewBook";
import EditBoxForm from "./EditBox";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useRouter } from "next/dist/client/router";

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    background-color: ${(props) => props.theme.white};
    padding: 12px 6px;
    min-height: 1000px;
    margin: 30px auto;
`;

const DetailTitle = styled(Title)`
    text-align: left;
    font-size: 32px;
    padding: 12px 6px;
`;

const CreatorUser = styled.div`
    width: 100%;
    text-align: right;
    div {
        margin: 0 4px;
    }
`;

const RatingStar = styled.div`
    width: fit-content;
    margin-left: auto;
`;

const Content = styled.div`
    margin-top: 12px;
    border-top: 3px solid ${(props) => props.theme.border};
    padding: 24px 6px;
    min-height: 500px;

    img {
        max-width: 100%;
    }
`;

const Edit = styled.div`
    width: 100px;
    margin-left: auto;
`;

const GoBack = styled.div`
    width: 100%;
    margin: 24px;
    text-align: center;
`;

type Props = {
    reviewById?: ReviewPost;
    review: boolean;
    freeBoardById?: FreeBoard;
    onDelete: onClick;
    onEdit: onClick;
};
const DetailForm = ({
    reviewById,
    freeBoardById,
    review,
    onDelete,
    onEdit,
}: Props) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const onGoBack = useCallback(() => {
        router.back();
    }, []);
    return (
        <>
            <GoBack>
                <Button type="button" onClick={onGoBack}>
                    뒤로가기
                </Button>
            </GoBack>
            <Container className="ql-container ql-editor">
                {review ? (
                    <>
                        <DetailTitle>{reviewById.title}</DetailTitle>
                        <CreatorUser>
                            <div>{reviewById.userId}</div>
                            <div>{reviewById.regDate}</div>
                            <div>조회수 {reviewById.count}</div>
                        </CreatorUser>
                        <ReviewBookForm reviewById={reviewById} />
                        {user?.review.map(
                            (r: string) =>
                                r === reviewById._id && (
                                    <Edit>
                                        <EditBoxForm
                                            id={reviewById._id}
                                            onDelete={onDelete}
                                            onEdit={onEdit}
                                        />
                                    </Edit>
                                )
                        )}
                        <RatingStar>
                            <Rating rating={reviewById.rating} />
                        </RatingStar>
                        <Content
                            dangerouslySetInnerHTML={{
                                __html: reviewById.content,
                            }}
                        />
                    </>
                ) : (
                    <>
                        <DetailTitle>{freeBoardById.title}</DetailTitle>
                        <CreatorUser>
                            <div>{freeBoardById.userId}</div>
                            <div>{freeBoardById.regDate}</div>
                            <div>조회수 {freeBoardById.count}</div>
                        </CreatorUser>
                        {user?.board.map(
                            (f: string) =>
                                f === freeBoardById._id && (
                                    <Edit>
                                        <EditBoxForm
                                            id={freeBoardById._id}
                                            onDelete={onDelete}
                                            onEdit={onEdit}
                                        />
                                    </Edit>
                                )
                        )}

                        <Content
                            dangerouslySetInnerHTML={{
                                __html: freeBoardById.content,
                            }}
                        />
                    </>
                )}
            </Container>
        </>
    );
};

export default DetailForm;
