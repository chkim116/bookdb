import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

type Props = {
    length: number;
    initial: number;
    count: number;
    limit: number;
};

export const useScroll = (
    viewPort: any,
    { length, initial, count, limit }: Props
): any => {
    const [display, setDisplay] = useState(initial);
    const router = useRouter();

    const { isLoading } = useSelector((state: RootState) => state.loading);
    const lastElement = useCallback(
        (node) => {
            if (isLoading) return;
            if (node === null) return;
            if (viewPort === undefined) return;
            if (length < display) return;
            if (display === limit) return;
            viewPort = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && display !== limit) {
                    viewPort.disconnect();
                    setDisplay((prev: number) => (prev += count));
                }
            });
            if (node) {
                viewPort.observe(node);
            }
        },
        [isLoading, display, length, limit, viewPort]
    );

    useEffect(() => {
        setDisplay((prev) => initial);
    }, [router.query]);

    return [lastElement, display];
};

export const useMore = ({ length, initial, count, limit }: Props): any => {
    const [display, setDisplay] = useState(initial);

    const onClick = useCallback(() => {
        if (display === limit) return;
        if (length < display) return;
        setDisplay((prev: number) => (prev += count));
    }, [display, length, limit]);

    return [onClick, display];
};
