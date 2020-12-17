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
import wrapper from "../../store/configureStore";
import { authRequest } from "../../redux/auth";
import { END } from "redux-saga";
import { Seo } from "../../head/Seo";

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

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store, params } = ctx;

    const list: BoardCard[] = await Axios.post("/crawling/best", params).then(
        (res) => res.data
    );

    const cookie = ctx.req?.headers?.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
        store.dispatch(authRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
    return {
        props: {
            list: list,
        },
    };
});
export default index;
