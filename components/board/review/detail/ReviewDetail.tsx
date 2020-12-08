import React from "react";
import { ReviewPost } from "../../../../@types/types";
import DetailForm from "../../../Common/DetailForm";

type Props = {
    reviewById: ReviewPost;
};

const ReviewDetail = ({ reviewById }: Props) => {
    return (
        <>
            <DetailForm reviewById={reviewById} review={true}></DetailForm>
        </>
    );
};

export default ReviewDetail;
