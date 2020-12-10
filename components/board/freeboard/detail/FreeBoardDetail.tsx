import React from "react";
import { FreeBoard } from "../../../../@types/types";
import DetailForm from "../../../Common/DetailForm";

type Props = {
    freeBoardById: FreeBoard;
};

const FreeBoardDetail = ({ freeBoardById }: Props) => {
    return (
        <div>
            <DetailForm freeBoardById={freeBoardById} review={false} />
        </div>
    );
};

export default FreeBoardDetail;
