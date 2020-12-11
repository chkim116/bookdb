import React from "react";
import { FreeBoard, onClick } from "../../../../@types/types";
import DetailForm from "../../../Common/DetailForm";

type Props = {
    freeBoardById: FreeBoard;
    onDelete: onClick;
    onEdit: onClick;
};

const FreeBoardDetail = ({ freeBoardById, onDelete, onEdit }: Props) => {
    return (
        <div className="ql-snow">
            <DetailForm
                freeBoardById={freeBoardById}
                onDelete={onDelete}
                onEdit={onEdit}
                review={false}
            />
        </div>
    );
};

export default FreeBoardDetail;
