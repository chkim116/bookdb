import { GetServerSideProps, GetStaticProps } from "next";
import MainPage from "../components/Home/MainPage";
import { Container } from "../styles/CommonStyle";
import Axios from "axios";
import { BoardCard, Interview } from "../@types/types";
import { useCallback, useEffect, useState } from "react";
import wrapper from "../store/configureStore";
import { authRequest } from "../redux/auth";
import { END } from "redux-saga";

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

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx;

    const interview: Interview[] = await Axios.get("/crawling/interview").then(
        (res) => res.data
    );
    const list: BoardCard[] = await Axios.get("/crawling/steady").then(
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
            interview: interview,
            list: list,
        },
    };
});
