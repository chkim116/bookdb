import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

export const useScroll = (viewPort: any, loading: BooleanConstructor): any => {
    const [display, setDisplay] = useState(10);
    const { searchResults } = useSelector((state: RootState) => state.search);
    const lastElement = useCallback(
        (node) => {
            if (loading) return;
            if (node === null) return;
            if (viewPort === undefined) return;
            if (searchResults.length < display) return;
            viewPort = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && display !== 99) {
                    if (viewPort) viewPort.disconnect();
                    setDisplay((prev) =>
                        prev === 90 ? (prev += 9) : (prev += 10)
                    );
                }
            });
            if (node) {
                viewPort.observe(node);
            }
        },
        [loading]
    );

    return [lastElement, display];
};

export const useMore = (): any => {
    const [display, setDisplay] = useState(10);
    const onClick = useCallback(() => {
        setDisplay((prev) => (prev += 10));
    }, []);

    return [onClick, display, setDisplay];
};
