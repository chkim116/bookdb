import MainPage from "../components/Home/MainPage";
import { Container } from "../styles/CommonStyle";
import Axios from "axios";
import { BoardCard, Interview } from "../@types/types";
import { useCallback, useEffect, useState } from "react";
import { getRecentPostRequest } from "../redux/review";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { Seo } from "../head/Seo";
import useSWR from "swr";
import Loader from "../styles/loader";
import SkeletonLoader from "../styles/SkeletonLoader";

export type Slide = {
    slide: number;
};

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

export default function Home() {
    const [slide, setSlide] = useState(0); // 이동
    const [count, setCount] = useState(1); // 몇 번 이동시킬지 제한을 두는 카운트
    const [boardWidth, setBoardWidth] = useState(0); // 게시글들의 너비
    const [containerWidth, setContainerWidth] = useState(0); // 총 게시글 너비
    const max = Math.floor(boardWidth / containerWidth) + 1; // 이 수와 같으면 앞으로 X
    const { reviews } = useSelector((state: RootState) => state.review);
    const dispatch = useDispatch();
    let widths: number = 0;
    let containerW: number = 0;

    const { data: list, error: steadyErr } = useSWR("/search/steady", fetcher);
    const { data: interview, error: interviewErr } = useSWR(
        "/search/interview",
        fetcher
    );

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
        dispatch(getRecentPostRequest());
    }, []);

    useEffect(() => {
        setBoardWidth(widths);
        setContainerWidth(containerW);
    }, [widths, containerW]);

    const data = {
        title: "Home",
        description: "원하는 책을 검색하고, 평가하고 리뷰하세요!, BookDB",
    };

    return (
        <Container>
            <Seo data={data} />
            {interview && list ? (
                <MainPage
                    reviews={reviews}
                    interview={interview}
                    onNextSlide={onNextSlide}
                    onPrevSlide={onPrevSlide}
                    list={list}
                    slide={slide}
                />
            ) : (
                <SkeletonLoader />
            )}
        </Container>
    );
}
