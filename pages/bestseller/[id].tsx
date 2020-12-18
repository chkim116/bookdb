import React, { useEffect, useState } from "react";
import BestSellerForm from "../../components/bestseller/BestSellerForm";
import { useRouter } from "next/dist/client/router";
import { Container } from "../../styles/CommonStyle";
import { BoardCard, Paths } from "../../@types/types";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest, loadSuccess } from "../../redux/loading";
import { RootState } from "../../redux";
import Loader from "../../styles/loader";
import { authRequest } from "../../redux/auth";
import { Seo } from "../../head/Seo";
import { GetStaticPaths, GetStaticProps } from "next";
import iconv from "iconv-lite";
import cheerio from "cheerio";

const checkRouter = (id: string | string[]): string => {
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

type Props = {
    list: BoardCard[];
};

const index = ({ list }: Props) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("주간 베스트셀러 TOP20");
    const [selected, setSelected] = useState<string>("0");
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.loading);

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { value } = e.target as HTMLInputElement;
        setSelected(value);
        dispatch(loadRequest());
        router.push(`/bestseller/${value}`);
    };

    useEffect(() => {
        const { id } = router.query;
        const bestTitle = checkRouter(id);
        dispatch(loadSuccess());
        setTitle(bestTitle);
    }, [router]);

    useEffect(() => {
        if (process.browser) {
            const cookie = document.cookie;
            Axios.defaults.headers.Cookie = "";
            Axios.defaults.headers.withCredentials = true;
            if (cookie) {
                Axios.defaults.headers.Cookie = cookie;
                dispatch(authRequest());
            }
        }
    }, [router.query]);

    const data = {
        title: `베스트셀러`,
        description:
            "주간, 월간, 년간 베스트셀러를 쉽게 파악할 수 있어요!, BookDB",
        keywords:
            "베스트셀러, 책베스트셀러, 주간베스트셀러, 월간베스트셀러, 년간베스트셀러, 교보문고, 교보문고베스트셀러",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            {isLoading && <Loader />}
            <BestSellerForm
                list={list}
                title={title}
                selected={selected}
                onClick={onClick}
            />
        </Container>
    );
};

export const getStaticPaths: GetStaticPaths = (ctx): any => {
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
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { params } = ctx;
    const url = `http://www.kyobobook.co.kr/bestSellerNew/bestseller.laf?range=1&kind=${params.id}&orderClick=DAA&mallGb=KOR&linkClass=A`;
    let list: BoardCard[] = [];
    try {
        const kyobo = await Axios.get(url, {
            responseType: "arraybuffer",
        }).then((res) => res.data);
        const decoded = iconv.decode(kyobo, "EUC-KR");
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
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            list,
        },
    };
};
export default index;
