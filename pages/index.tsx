import { GetStaticProps } from "next";
import MainPage from "../components/Home/MainPage";
import { Container } from "../styles/CommonStyle";
import iconv from "iconv-lite";
import cheerio from "cheerio";
import Axios from "axios";
import { BoardCard, Interview } from "../@types/typs";
import { useCallback, useEffect, useState } from "react";

export type Slide = {
    slide: number;
};

type Props = {
    interview: Interview[];
    list: BoardCard[];
};

export default function Home({ interview, list }: Props) {
    const [slide, setSlide] = useState(0); // 이동
    const [count, setCount] = useState(1); // 몇 번 이동시킬지 제한을 두는 카운트
    const [boardWidth, setBoardWidth] = useState(0); // 게시글들의 너비
    const [containerWidth, setContainerWidth] = useState(0); // 총 게시글 너비
    const max = Math.floor(boardWidth / containerWidth) + 1; // 이 수와 같으면 앞으로 X
    let widths: number = 0;
    let containerW: number = 0;

    const onNextSlide = useCallback(() => {
        if (count === max) {
            return;
        } else {
            setCount((prev) => (prev += 1));
            setSlide(-100 * count);
        }
    }, [slide, count]);

    const onPrevSlide = useCallback(() => {
        if (count === 1) {
            return;
        } else {
            setCount((prev) => (prev -= 1));
            setSlide((prev) => prev + 100);
        }
    }, [slide, count]);

    if (process.browser) {
        const container = document.querySelector(".slider");
        const width = document.querySelectorAll(".sliderbox");
        if (container && width) {
            containerW = container.clientWidth;
            width.forEach((v) => (widths += v.clientWidth));
        }
    }

    useEffect(() => {
        setBoardWidth(widths);
        setContainerWidth(containerW);
    }, [widths, containerW]);

    return (
        <Container>
            <MainPage
                interview={interview}
                onNextSlide={onNextSlide}
                onPrevSlide={onPrevSlide}
                list={list}
                slide={slide}
            />
            <div></div>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    let interview: Interview[] = [];
    const url =
        "http://news.kyobobook.co.kr/people/interview.ink?orderclick=QBJ";
    const getInterview = await Axios.get(url, {
        responseType: "arraybuffer",
    }).then((res) => res.data);
    const decoded = iconv.decode(getInterview, "EUC-KR");
    const $ = cheerio.load(decoded);
    const $body = $("ul.list_type_webzine").children("li");
    $body.each(function (i) {
        while (i < 6) {
            interview[i] = {
                title: $(this).find("div.title a").text(),
                url: $(this)
                    .find("div.title a")
                    .attr("href")
                    .split("(")[1]
                    .split(",")[0],
                detail: $(this).find("div.preview a").text(),
                imageUrl: $(this).find("div.thumb img").attr("src"),
                id: i++,
            };
        }
    });

    let list: BoardCard[] = [];
    const kyobo = await Axios.get(
        `http://www.kyobobook.co.kr/bestSellerNew/steadyseller.laf?orderClick=D0b`,
        { responseType: "arraybuffer" }
    ).then((res) => res.data);
    const decodeding = iconv.decode(kyobo, "EUC-KR");
    const $$ = cheerio.load(decodeding);
    const $bodyList = $$("ul.list_type01").children("li");

    $bodyList.each(function (i) {
        list[i] = {
            title: $(this).find("div.title strong").text(),
            url: $(this).find("div.cover a").attr("href"),
            imageUrl: $(this).find("img").attr("src"),
            imageAlt: $(this).find("img").attr("alt"),
            summary: $(this).find("div.subtitle").text(),
            auth: $(this)
                .find("div.author")
                .text()
                .split("|")[0]
                .replace("저자 더보기", ""),
            id: i++,
        };
    });

    return {
        props: {
            interview: interview as Interview[],
            list: list as BoardCard[],
        },
    };
};
