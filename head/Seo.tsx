import React from "react";
import Head from "next/head";
import img from "../images/login.jpg";

export const Seo = ({ data }: any) => {
    const lang = "ko";
    const title = data.title;
    const description = data.description;
    const image = data.img ? data.img : img;
    const canonical = `https://www.bookdb.cf/${data.canonical}`;
    const type = data.type === undefined ? "article" : data.type;
    const width = data.image && (data.width || 1200);
    const height = data.image && (data.height || 630);
    const keywords = data.keywords
        ? data.keywords
        : "북, 책, 책리뷰, 책추천, 책검색, 책사기, 베스트셀러, 작가인터뷰";
    return (
        <Head>
            <title>{title} | BookDB</title>
            <meta name="description" content={description} />
            <meta name="author" content="BookDB 북디비"></meta>
            {canonical ? <link rel="canonical" href={canonical} /> : null}
            {image ? <link rel="image_src" href={image} /> : null}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:site_name" content="BookDB 북디비" />
            <meta property="og:title" content={title} />
            {description ? (
                <meta property="og:description" content={description} />
            ) : null}
            {canonical ? <meta property="og:url" content={canonical} /> : null}
            <meta property="og:locale" content={lang} />
            <meta property="og:type" content={type} />
            {image ? <meta property="og:image" content={image} /> : null}
            {width ? <meta property="og:image:width" content={width} /> : null}
            {height ? (
                <meta property="og:image:height" content={height} />
            ) : null}
            <meta property="fb:pages" content="https://bookdb.cf" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? (
                <meta name="twitter:description" content={description} />
            ) : null}
            {image ? <meta name="twitter:image" content={image} /> : null}
            <meta name="twitter:site" content="https://bookdb.cf" />
        </Head>
    );
};
