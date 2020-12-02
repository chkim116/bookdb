import styled from "@emotion/styled";
import MainPage from "../components/Home/MainPage";
import Axios from "axios";
import cheerio from "cheerio";
import { GetStaticProps } from "next";
import iconv from "iconv-lite";

const Container = styled.div`
    width: 100%;
`;

export type BestSeller = {
    title: string;
    auth: string;
    imageAlt: string;
    imageUrl: string;
    summary: string;
    url: string;
    id: number;
};

export default function Home({ list }: any) {
    return (
        <Container>
            <MainPage list={list} />
            <div></div>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    let list: BestSeller[] = [];
    try {
        const gyobo = await Axios.get(
            "http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?orderClick=d80",
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
                auth: $(this).find("div.author").text(),
                id: i++,
            };
        });
    } catch (err) {
        console.log(err);
    }
    return {
        props: {
            list,
        },
    };
};
