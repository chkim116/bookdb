import React from "react";
import { onClick, ReviewPost } from "../../../../@types/types";
import DetailForm from "../../../Common/DetailForm";

type Props = {
    reviewById: ReviewPost;
    onDelete: onClick;
    onEdit: onClick;
};

const ReviewDetail = ({ reviewById, onDelete, onEdit }: Props) => {
    return (
        <>
            <DetailForm
                reviewById={reviewById}
                onDelete={onDelete}
                onEdit={onEdit}
                review={true}></DetailForm>
        </>
    );
};

export default ReviewDetail;
