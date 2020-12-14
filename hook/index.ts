import { useCallback, useEffect, useState } from "react";

type Props = {
    viewPort?: any;
    length: number;
    initial: number;
    count: number;
    limit: number;
    isLoading?: boolean;
    query?: any;
};

export const useScroll = ({
    viewPort,
    length,
    initial,
    count,
    limit,
    query,
    isLoading,
}: Props): any => {
    const [display, setDisplay] = useState(initial);
    const lastElement = useCallback(
        (node) => {
            if (
                isLoading ||
                length < display ||
                display === limit ||
                viewPort === undefined ||
                node === null
            )
                return;
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
    }, [query]);

    return [lastElement, display];
};

export const useMore = ({
    length,
    initial,
    count,
    limit,
    query,
    isLoading,
}: Props): any => {
    const [display, setDisplay] = useState(initial);
    const onClick = useCallback(() => {
        if (display === limit || length < display || isLoading) return;
        setDisplay((prev: number) => (prev += count));
    }, [display, length, limit]);

    useEffect(() => {
        setDisplay((prev) => initial);
    }, [query]);

    return [onClick, display];
};
