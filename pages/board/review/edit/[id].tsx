import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewEditForm from "../../../../components/board/review/edit/ReviewEditForm";
import { RootState } from "../../../../redux";
import { getReviewByIdRequest } from "../../../../redux/review";
import { Container } from "../../../../styles/CommonStyle";
import theme from "../../../../styles/theme";

const index = () => {
    const router = useRouter();
    const {
        query: { id },
    } = router;
    const dispatch = useDispatch();
    const { reviewById } = useSelector((state: RootState) => state.review);
    useEffect(() => {
        dispatch(getReviewByIdRequest(id));
    }, []);

    return (
        <Container color={theme.white}>
            <ReviewEditForm reviewById={reviewById} />
        </Container>
    );
};

export default index;
