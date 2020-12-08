import React from "react";
import { BoardCard, ReviewPost } from "../../@types/types";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "../../styles/CommonStyle";
import faker from "faker";
import Rating from "./Rating";
import { css } from "@emotion/react";

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
    margin: 0 auto;
`;

const BoardCardForm = styled.div<Components>`
    text-align: center;
    padding: 12px;
    min-height: 300px;
    ${(props) =>
        props.review &&
        css`
            max-width: 450px;
        `}

    background: ${(props) => props.theme.white};
    height: ${(props) => !props.review && "480px"};
    border-radius: 8px;
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
};

const BoardForm = ({ list, review, reviewPost }: Props) => {
    return (
        <Container review={review ? true : false}>
            {review
                ? reviewPost.map((v) => (
                      <div key={v._id}>
                          <Link href={`/board/review/detail/${v._id}`}>
                              <a>
                                  <BoardCardForm review={review}>
                                      <BoardTitle>{v.title}</BoardTitle>
                                      <BoardImg review={review}>
                                          <img
                                              src={v.selectedBook.image}
                                              alt="리뷰 책"
                                          />
                                      </BoardImg>
                                      <Auth>{v.selectedBook.author}</Auth>
                                      <Rating rating={v.rating} />
                                      <div
                                          dangerouslySetInnerHTML={{
                                              __html:
                                                  v.content.length > 200
                                                      ? `${v.content.slice(
                                                            0,
                                                            200
                                                        )}...`
                                                      : v.content,
                                          }}></div>
                                  </BoardCardForm>
                              </a>
                          </Link>
                      </div>
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
