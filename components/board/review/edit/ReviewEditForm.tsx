import React from "react";
import { ReviewPost } from "../../../../@types/types";
import WriteForm from "../../../Common/WriteForm";

type Props = {
    reviewById: ReviewPost;
};

const ReviewEditForm = ({ reviewById }: Props) => {
    return (
        <WriteForm
            review={true}
            update={true}
            reviewById={reviewById}></WriteForm>
    );
};

export default ReviewEditForm;
