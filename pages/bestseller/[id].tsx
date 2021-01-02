import React, { useEffect, useState } from "react";
import BestSellerForm from "../../components/bestseller/BestSellerForm";
import { useRouter } from "next/dist/client/router";
import { Container } from "../../styles/CommonStyle";
import { Paths } from "../../@types/types";
import { useDispatch } from "react-redux";
import { loadRequest, loadSuccess } from "../../redux/loading";
import { Seo } from "../../head/Seo";
import useSWR from "swr";
import Loader from "../../styles/loader";
import Axios from "axios";
import SkeletonLoader from "../../styles/SkeletonLoader";

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

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

const index = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("주간 베스트셀러 TOP20");
    const [selected, setSelected] = useState<string>("0");
    const dispatch = useDispatch();

    const { data: list, error } = useSWR(
        `/search/best/${router.query.id}`,
        fetcher
    );

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
            {list ? (
                <BestSellerForm
                    list={list}
                    title={title}
                    selected={selected}
                    onClick={onClick}
                />
            ) : (
                <SkeletonLoader />
            )}
        </Container>
    );
};

export default index;
