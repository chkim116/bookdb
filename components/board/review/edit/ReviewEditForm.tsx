import React from "react";
import {
    onChange,
    onClick,
    onFormChange,
    onSubmit,
    ReviewPost,
} from "../../../../@types/types";
import WriteForm from "../../../Common/WriteForm";

type Props = {
    reviewById: ReviewPost;
    onWrite: onChange;
    onSubmit: onSubmit;
    onFindId?: onClick;
    onChange?: onFormChange;
};

const ReviewEditForm = ({
    reviewById,
    onChange,
    onWrite,
    onFindId,
    onSubmit,
}: Props) => {
    return (
        <WriteForm
            review={true}
            update={true}
            onChange={onChange}
            onWrite={onWrite}
            onFindId={onFindId}
            onSubmit={onSubmit}
            reviewById={reviewById}></WriteForm>
    );
};

export default ReviewEditForm;
