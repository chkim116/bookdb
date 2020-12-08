import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BsStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { writeRating } from "../../redux/review";

const MyStars = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    svg {
        margin: 0 2px;
        cursor: pointer;
    }
`;

type Props = {
    rating?: string;
};

const Rating = ({ rating }: Props) => {
    const stars = useRef();
    const dispatch = useDispatch();
    const [ratingNum, setRatingNum] = useState("");

    const onMouseOver = useCallback(
        (e: React.MouseEvent<SVGElement, MouseEvent>) => {
            if (rating !== "") {
                return;
            }
            const { value } = e.currentTarget.dataset;
            setRatingNum(value);
        },
        [ratingNum, rating]
    );

    const onFix = useCallback(() => {
        dispatch(writeRating({ rating: ratingNum }));
    }, [dispatch, ratingNum]);

    useEffect(() => {
        const { childNodes }: any = stars.current;
        childNodes.forEach((star: any) =>
            parseInt(star.dataset.value) <= parseInt(ratingNum)
                ? (star.attributes.fill.value = "red")
                : (star.attributes.fill.value = "black")
        );
    }, [ratingNum, stars]);

    useEffect(() => {
        if (rating !== "") {
            setRatingNum(rating);
            const { childNodes }: any = stars.current;
            childNodes.forEach((star: any) =>
                parseInt(star.dataset.value) <= parseInt(ratingNum)
                    ? (star.attributes.fill.value = "red")
                    : (star.attributes.fill.value = "black")
            );
        }
    }, [rating, stars]);

    return (
        <>
            <MyStars ref={stars}>
                <BsStarFill
                    size={24}
                    onClick={onFix}
                    data-value="1"
                    onMouseOver={onMouseOver}
                />
                <BsStarFill
                    size={24}
                    onClick={onFix}
                    data-value="2"
                    onMouseOver={onMouseOver}
                />
                <BsStarFill
                    size={24}
                    onClick={onFix}
                    data-value="3"
                    onMouseOver={onMouseOver}
                />
                <BsStarFill
                    size={24}
                    onClick={onFix}
                    data-value="4"
                    onMouseOver={onMouseOver}
                />
                <BsStarFill
                    size={24}
                    onClick={onFix}
                    data-value="5"
                    onMouseOver={onMouseOver}
                />
            </MyStars>
        </>
    );
};

export default Rating;
