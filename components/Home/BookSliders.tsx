import React from "react";
import { BoardCard } from "../../@types/typs";
import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "../../styles/CommonStyle";

const Books = styled.div<ComponentProps>`
    position: relative;
    padding: 12px;
    text-align: center;
    left: ${(props) => props.slide}%;
    transition: left 500ms;
    div {
        margin: 8px 0;
    }
`;

const BooksImg = styled.div`
    height: 250px;
    img {
        height: 100%;
    }
`;

type ComponentProps = {
    slide: number;
};

type Props = {
    slide: number;
    list: BoardCard[];
};

const BookSliders = ({ list, slide }: Props) => {
    return (
        <>
            {list.map((v) => (
                <Books slide={slide} className="sliderbox" key={v.id}>
                    <BooksImg>
                        <img src={v.imageUrl} alt={v.imageAlt} />
                    </BooksImg>
                    <div>{v.auth}</div>
                    <Link href={v.url}>
                        <a target="blank">
                            <Button hover={true}>구매하기</Button>
                        </a>
                    </Link>
                </Books>
            ))}
        </>
    );
};

export default BookSliders;
