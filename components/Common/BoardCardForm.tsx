import React from "react";
import { BoardCard, onClick, ReviewPost } from "../../@types/types";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "../../styles/CommonStyle";
import EditBoxForm from "../Common/EditBox";
import faker from "faker";
import { css } from "@emotion/react";
import Rating from "./Rating";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Container = styled.article<Components>`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    ${(props) =>
        props.review
            ? css`
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-around;
              `
            : css`
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
              `}

    gap: 12px;
    padding: 36px 0;
    margin: 36px auto;
`;

const ReviewForm = styled.div`
    &:hover {
        ${(props) => props.theme.boxShadow};
    }
`;

const BoardCardForm = styled.div<Components>`
    text-align: center;
    padding: 12px;
    min-height: 300px;
    ${(props) =>
        props.review &&
        css`
            max-width: 450px;
            min-width: 235px;
        `}

    background: ${(props) => props.theme.white};
    height: ${(props) => !props.review && "480px"};
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: ${(props) => props.theme.boxShadow};
    a {
        width: fit-content;
        margin: 10px auto;
    }
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

const BoardTitle = styled.h3`
    font-weight: bold;
    position: relative;
    margin-bottom: 8px;
`;

const BoardImg = styled.div<Components>`
    width: ${(props) => (props.review ? "82px" : "200px")};
    height: ${(props) => (props.review ? "120px" : "288px")};
    margin: 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
`;

const Content = styled.div`
    text-align: left;
    max-height: 400px;
    overflow: hidden;
    img {
        max-width: 100%;
    }
`;

const Auth = styled.div`
    padding: 8px 0;
    font-weight: 700;
`;

type Components = {
    review?: boolean;
};

type Props = Components & {
    list?: BoardCard[];
    reviewPost?: ReviewPost[];
    onDelete: onClick;
    onEdit: onClick;
};

const BoardForm = ({ list, review, reviewPost, onDelete, onEdit }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <Container review={review ? true : false}>
            {review
                ? reviewPost.map((v) => (
                      <ReviewForm key={v._id}>
                          <Link href={`/board/review/detail/${v._id}`}>
                              <a>
                                  <BoardCardForm review={review}>
                                      <BoardTitle>{v.title}</BoardTitle>
                                      <div>조회수 {v.count}</div>
                                      <BoardImg review={review}>
                                          <img
                                              src={v.selectedBook.image}
                                              alt="리뷰 책"
                                          />
                                      </BoardImg>
                                      <Auth>{v.selectedBook.author}</Auth>
                                      <Rating rating={v.rating} />
                                      <Content
                                          dangerouslySetInnerHTML={{
                                              __html:
                                                  v.content.length > 300
                                                      ? `${v.content.slice(
                                                            0,
                                                            300
                                                        )}...`
                                                      : v.content,
                                          }}></Content>
                                  </BoardCardForm>
                              </a>
                          </Link>
                          {user?.review.map(
                              (r: string) =>
                                  r === v._id && (
                                      <EditBoxForm
                                          id={v._id}
                                          onDelete={onDelete}
                                          onEdit={onEdit}
                                      />
                                  )
                          )}
                      </ReviewForm>
                  ))
                : list.map((v: BoardCard) => (
                      <div key={faker.random.uuid()}>
                          <Rank>{v.id + 1}</Rank>
                          <BoardCardForm>
                              <BoardTitle>{v.title}</BoardTitle>
                              <BoardImg>
                                  <img src={v.imageUrl} alt={v.imageAlt} />
                              </BoardImg>
                              <Auth>{v.auth}</Auth>
                              <p>
                                  {v.summary.length > 250
                                      ? `${v.summary.slice(0, 200)}...`
                                      : v.summary}
                              </p>
                              <Link href={v.url}>
                                  <a target="blank">
                                      <Button>더보기</Button>
                                  </a>
                              </Link>
                          </BoardCardForm>
                      </div>
                  ))}
        </Container>
    );
};

export default BoardForm;
