import React from "react";
import { FreeBoard } from "../../../../redux/freeBoard";
import WriteCommonForm from "../../../Common/WriteForm";

type Props = {
    freeBoardById: FreeBoard;
};

const FreeBoardEditForm = ({ freeBoardById }: Props) => {
    return (
        <WriteCommonForm
            review={false}
            update={true}
            freeBoardById={freeBoardById}></WriteCommonForm>
    );
};

export default FreeBoardEditForm;
