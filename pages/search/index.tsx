import Axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

type BookData = {
    title: string;
    link: string;
    image: string;
    author: string;
    price: string;
    discount: string;
    publisher: string;
    pubdate: string;
    isbn: string;
    description: string;
};

const index = ({ ...items }: BookData) => {
    return <div></div>;
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await Axios.get(
        "https://openapi.naver.com/v1/search/book?query=react",
        {
            headers: {
                "X-Naver-Client-Id": "r7zXYx4Kt_ooVXh2kxUB",
                "X-Naver-Client-Secret": "ygQmF36eTQ",
            },
        }
    );

    const { items } = data;
    return {
        props: {
            items,
        },
    };
};
