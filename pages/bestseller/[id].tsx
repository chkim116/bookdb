import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import BestSellerForm from "../../components/bestseller/BestSellerForm";
import { useRouter } from "next/dist/client/router";
import { Container } from "../../styles/CommonStyle";
import { BoardCard, Paths } from "../../@types/typs";
import Axios from "axios";

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
    const [selected, setSelected] = useState<string | string[]>("0");

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { value } = e.target as HTMLInputElement;
        setSelected(value);
        router.push(`/bestseller/${value}`);
    };

    useEffect(() => {
        const { id } = router.query;
        const bestTitle = checkRouter(id);
        setTitle(bestTitle);
    }, [router]);

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
    const list: BoardCard[] = await Axios.post("/crawling/best", params).then(
        (res) => res.data
    );
    return {
        props: {
            list: list,
        },
    };
};

export default index;
