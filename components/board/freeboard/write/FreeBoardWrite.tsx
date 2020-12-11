import React from "react";
import { onFormChange, onSubmit } from "../../../../@types/types";
import WriteCommonForm from "../../../Common/WriteForm";

type Props = {
    onSubmit: onSubmit;
    onWrite: onFormChange;
};

const FreeBoardWrite = ({ onSubmit, onWrite }: Props) => {
    return (
        <WriteCommonForm
            review={false}
            update={false}
            onSubmit={onSubmit}
            onWrite={onWrite}></WriteCommonForm>
    );
};

export default FreeBoardWrite;
