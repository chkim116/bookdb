import React from "react";
import { FreeBoard, onFormChange, onSubmit } from "../../../../@types/types";
import WriteCommonForm from "../../../Common/WriteForm";

type Props = {
    freeBoardById: FreeBoard;
    onWrite: onFormChange;
    onSubmit: onSubmit;
};

const FreeBoardEditForm = ({ freeBoardById, onWrite, onSubmit }: Props) => {
    return (
        <WriteCommonForm
            review={false}
            update={true}
            onWrite={onWrite}
            onSubmit={onSubmit}
            freeBoardById={freeBoardById}></WriteCommonForm>
    );
};

export default FreeBoardEditForm;
