import React, { useState } from "react";
import iconv from "iconv-lite";
import cheerio from "cheerio";
import { GetStaticPaths, GetStaticProps } from "next";
import BestSellerForm from "../../components/bestseller/BestSellerForm";
import { useRouter } from "next/dist/client/router";
import Axios from "axios";
import { Container } from "../../styles/CommonStyle";
import { BoardCard, Paths } from "../../@types/typs";

const checkRouter = (id: string): string => {
    if (id === Paths.WEEK) {
        return "주간 베스트셀러 TOP20";
    }
    if (id === Paths.MONTHLY) {
        return "월간 베스트셀러 TOP20";
    }
    if (id === Paths.YEARS) {
        return "년간 베스트셀러 TOP20";
    }
};

const index = ({ list }: any) => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("주간 베스트셀러 TOP20");
    const [selected, setSelected] = useState<string | string[]>("0");

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { value } = e.target as HTMLInputElement;
        setSelected(value);
        router.push(`/bestseller/${value}`);
        setTitle(checkRouter(value));
    };

    return (
        <Container>
            <BestSellerForm
                list={list}
                title={title}
                selected={selected}
                onClick={onClick}
            />
        </Container>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { id: Paths.WEEK },
            },
            {
                params: { id: Paths.MONTHLY },
            },
            {
                params: { id: Paths.YEARS },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let list: BoardCard[] = [];
    const gyobo = await Axios.get(
        `http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?range=1&kind=${params.id}&orderClick=DAA&mallGb=KOR&linkClass=A`,
        { responseType: "arraybuffer" }
    ).then((res) => res.data);
    const decoded = iconv.decode(gyobo, "EUC-KR");
    const $ = cheerio.load(decoded);
    const $bodyList = $("ul.list_type01").children("li");

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
            list,
        },
    };
};

export default index;
